import { firebaseConfiguration } from "./firebase.config";
import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import type { User } from "firebase/auth";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  enableMultiTabIndexedDbPersistence,
  getDoc,
  getFirestore,
  QueryDocumentSnapshot,
  setDoc,
  writeBatch
} from "firebase/firestore";
import { Order } from "../../store/orderHistory/orderHistory.types";
import { Category } from "../../store/categories/category.types";
import {
  AdditionalInformation,
  UserData
} from "../../store/userReducer/user.types";

export function firebaseInit() {
  const firebaseApp = initializeApp(firebaseConfiguration.firebaseConfig);
  const userAuth = getAuth(firebaseApp);
  const fireStorage = getFirestore(firebaseApp);
  const categoriesCollection = collection(fireStorage, "categories");
  const orderHistoryCollection = collection(fireStorage, "orderHistory");
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });
  // if (location.hostname === "localhost") {
  //   connectAuthEmulator(userAuth, "http://localhost:9090");
  //   connectFirestoreEmulator(fireStorage, "localhost", 8080);
  // }
  // enableMultiTabIndexedDbPersistence(fireStorage);
  return {
    categoriesCollection,
    orderHistoryCollection,
    firebaseApp,
    userAuth,
    fireStorage,
    googleProvider
  };
}

export const {
  categoriesCollection,
  orderHistoryCollection,
  firebaseApp,
  userAuth,
  fireStorage,
  googleProvider
} = firebaseInit();

export type CollectionName = {
  categories: "categories";
  orderHistory: "orderHistory";
};
export type NewOrder = Order;

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      userAuth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

//login functions

export const signInAnonymous = async () => {
  const { user } = await signInAnonymously(userAuth);
  console.log(user);
  return user;
};

export const signUpByEmailAndPassword = (email: string, password: string) => {
  if (!email || !password) return;

  createUserWithEmailAndPassword(userAuth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
    })
    .catch((error) => {
      console.log("Error message: ", error.message);
      console.log("Error code: ", error.code);

      if (error.code === "auth/email-already-in-use")
        window.alert(
          "E-mail jest w użyciu, zaloguj się albo użyj innego mail'a "
        );
    });
};

export const signInByEmailAndPassword = async (
  email: string,
  password: string
) => {
  let user = {};
  signInWithEmailAndPassword(userAuth, email, password)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
      console.log(user);
      return user;
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);

      if (error.code === "auth/wrong-password")
        window.alert("Nieprawidłowe hasło ");
      else if (error.code === "auth/user-not-found")
        window.alert("Nie istnieje użytkownik z takim adresem e-mail ");

      return error;
    });
};

export const signInWithGooglePopUp = () =>
  signInWithPopup(userAuth, googleProvider);

export const signOutUser = () => signOut(userAuth);

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInfos = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const userDocRef = doc(fireStorage, "users", userAuth.uid); //database, collection, unique ID
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfos
      });
    } catch (error) {
      console.log("I just caught some error while creating users!!", error);
    }
  }
  // if user data exists
  else if (userSnapshot.exists())
    return userSnapshot as QueryDocumentSnapshot<UserData>;
};

//admin functions
export const addNewOrderToHistory = (newOrder: NewOrder) => {
  console.log("New Order: ", newOrder);
  const newDoc = doc(
    fireStorage,
    `orderHistory/${newOrder.time.replaceAll("/", ".")}`
  );
  console.log("New Doc: ", newDoc);

  setDoc(newDoc, newOrder, { merge: true });
};
//function to create orderHistory collection and categories

// export const addCollectionAndDocuments = async (
//   collectionKey: string,
//   objectsToAdd: Category[]
// ) => {
//   const collectionRef = collection(fireStorage, collectionKey);
//   const batch = writeBatch(fireStorage);

//   objectsToAdd.forEach((object) => {
//     const docRef = doc(collectionRef, object.title)   //time.replaceAll("/", "."));
//     batch.set(docRef, object);
//   });

//   await batch.commit();
//   console.log("done");
// };
