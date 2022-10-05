import "bootstrap/dist/css/bootstrap.min.css";
import Button, {
  BUTTON_TYPE_CLASSES
} from "components/button/button.component";

import { useForm } from "react-hook-form";
import { FormButton, FormButtons } from "./checkoutForm.styles";

export const CheckoutForm = () => {
  const { register, handleSubmit } = useForm();

  const formData = {
    deliveryMethod: "deliveryMethod",
    city: "city",
    homeAdress: "homeAdress",
    state: "state",
    street: "street",
    zip: "zip",
    payMethod: "payMethod",
    subscription: "subscription"
  };

  return (
    <>
      <FormButtons>
        <FormButton>
          <Button buttonType={BUTTON_TYPE_CLASSES.loginCheckout}>
            Logowanie
          </Button>
        </FormButton>
        <FormButton>
          <Button buttonType={BUTTON_TYPE_CLASSES.loginCheckout}>
            Rejestracja
          </Button>
        </FormButton>
      </FormButtons>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className="form-group mt-2">
          <label htmlFor={`${formData.street}`}>Ulica</label>
          <input
            type="text"
            className="form-control"
            id={`${formData.street}`}
            placeholder="Ul. nazwa"
            {...register(`${formData.street}`)}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor={`${formData.homeAdress}`}>Numer domu</label>
          <input
            type="text"
            className="form-control"
            id={`${formData.homeAdress}`}
            placeholder="Nr klatki, nr mieszkania / domu"
            {...register(`${formData.homeAdress}`)}
          />
        </div>
        <div className="form-group row my-3">
          <div className="form-group col-md-4">
            <label htmlFor={`${formData.city}`}>Miasto</label>
            <input
              type="text"
              className="form-control"
              id={`${formData.city}`}
              {...register(`${formData.city}`)}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor={`${formData.state}`}>Województwo</label>
            <select
              id={`${formData.state}`}
              className="form-control"
              {...register(`${formData.state}`)}
              defaultValue={"..."}
            >
              <option>...</option>
              <option>Dolnośląskie</option>
              <option>Mazowieckie</option>
              <option>Opolskie</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor={`${formData.zip}`}>Kod pocztowy</label>
            <input
              type="text"
              className="form-control"
              id={`${formData.zip}`}
              {...register(`${formData.zip}`)}
            />
          </div>
        </div>
        <div className="form-group row px-auto ">
          <div className="form-group col-sm-6">
            <label htmlFor={`${formData.deliveryMethod}`}>Opcje dostawy</label>
            <select
              id={`${formData.deliveryMethod}`}
              className="form-control"
              defaultValue={"..."}
              {...register(`${formData.deliveryMethod}`)}
            >
              <option>...</option>
              <option>Poczta Polska</option>
              <option>Kurier DHL</option>
              <option>Kurier Inpost</option>
              <option>Kurier FedEx</option>
            </select>
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor={`${formData.payMethod}`}>Opcje płatności</label>
            <select
              id={`${formData.payMethod}`}
              className="form-control"
              defaultValue={"..."}
              {...register(`${formData.payMethod}`)}
            >
              <option>...</option>
              <option>Blik</option>
              <option>Za pobraniem</option>
              <option>Przelew tradycyjny</option>
            </select>
          </div>
        </div>
        <div className="form-group my-3">
          <div className="form-check">
            <label
              className="form-check-label"
              htmlFor={`${formData.subscription}`}
            >
              Subskrypcja
              <input
                className="form-check-input"
                type="checkbox"
                id={`${formData.subscription}`}
                {...register(`${formData.subscription}`)}
              />
            </label>
          </div>
        </div>
        <div className="form-group row mx-auto">
          <Button
            id="submitFormButton"
            type="submit"
            buttonType={BUTTON_TYPE_CLASSES.loginCheckout}
          >
            Zamawiaj
          </Button>
        </div>
      </form>
    </>
  );
};
