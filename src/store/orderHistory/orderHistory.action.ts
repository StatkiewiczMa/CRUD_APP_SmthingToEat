import { Dispatch } from "react";
import type { ActionCreator, AnyAction } from "redux";
import type { ThunkAction } from "redux-thunk";
import { postNewOrder, readOrderHistory } from "../../service/service";
import {
  Action,
  actionCreator,
  ActionWithPayload,
  withMatch
} from "../../utils/store/store.utils";
import { ReduxState } from "../rootReducer.redux";
import {
  DeliveryType,
  DELIVERY_TYPE,
  Order,
  ORDER_HISTORY_ACTION_TYPES
} from "./orderHistory.types";

export type SetDelivery = ActionWithPayload<
  ORDER_HISTORY_ACTION_TYPES.SET_DELIVERY,
  DeliveryType
>;

export const setDelivery = withMatch(
  (deliveryMethod: DeliveryType["type"]): SetDelivery =>
    actionCreator(ORDER_HISTORY_ACTION_TYPES.SET_DELIVERY, {
      type: deliveryMethod,
      price: DELIVERY_TYPE[deliveryMethod]
    })
);

export type FetchOrderHistoryStart =
  Action<ORDER_HISTORY_ACTION_TYPES.FETCH_ORDER_HISTORY_START>;

export type FetchOrderHistorySuccess = ActionWithPayload<
  ORDER_HISTORY_ACTION_TYPES.FETCH_ORDER_HISTORY_SUCCESS,
  Order[]
>;

export type FetchOrderHistoryFailed = ActionWithPayload<
  ORDER_HISTORY_ACTION_TYPES.FETCH_ORDER_HISTORY_FAILED,
  Error
>;

export const fetchOrderHistoryStart = withMatch(
  (): FetchOrderHistoryStart =>
    actionCreator(ORDER_HISTORY_ACTION_TYPES.FETCH_ORDER_HISTORY_START)
);

export const fetchOrderHistorySuccess = withMatch(
  (ordersHistory: Order[]): FetchOrderHistorySuccess =>
    actionCreator(
      ORDER_HISTORY_ACTION_TYPES.FETCH_ORDER_HISTORY_SUCCESS,
      ordersHistory
    )
);

export const fetchOrderHistoryFailed = withMatch(
  (error: Error): FetchOrderHistoryFailed =>
    actionCreator(ORDER_HISTORY_ACTION_TYPES.FETCH_ORDER_HISTORY_FAILED, error)
);

export const fetchOrderHistoryAsync = (): any => {
  //ThunkAction<void, any, unknown, AnyAction> => {
  return async (dispatch: any) => {
    dispatch(fetchOrderHistoryStart());
    try {
      const orderHistoryEndPoint = await readOrderHistory();
      dispatch(fetchOrderHistorySuccess(orderHistoryEndPoint));
    } catch (error) {
      dispatch(fetchOrderHistoryFailed(error as Error));
    }
  };
};

export type PostOrderHistoryStart =
  Action<ORDER_HISTORY_ACTION_TYPES.POST_ORDER_HISTORY_START>;

export type PostOrderHistorySuccess =
  Action<ORDER_HISTORY_ACTION_TYPES.POST_ORDER_HISTORY_SUCCESS>;

export type PostOrderHistoryFailed = ActionWithPayload<
  ORDER_HISTORY_ACTION_TYPES.POST_ORDER_HISTORY_FAILED,
  Error
>;

export const postOrderHistoryStart = withMatch(
  (): PostOrderHistoryStart =>
    actionCreator(ORDER_HISTORY_ACTION_TYPES.POST_ORDER_HISTORY_START)
);

export const postOrderHistorySuccess = withMatch(
  (): PostOrderHistorySuccess =>
    actionCreator(ORDER_HISTORY_ACTION_TYPES.POST_ORDER_HISTORY_SUCCESS)
);

export const postOrderHistoryFailed = withMatch(
  (error: Error): PostOrderHistoryFailed =>
    actionCreator(ORDER_HISTORY_ACTION_TYPES.POST_ORDER_HISTORY_FAILED, error)
);

export const postOrderHistoryAsync: any = //ThunkAction<
  // void,
  // any,
  // unknown,
  // AnyAction>
  (orderHistory: Order[], order: Order) => {
    return async (dispatch: Dispatch<AnyAction>) => {
      const tempOrder = order;
      dispatch(postOrderHistoryStart());
      try {
        const orderHistoryEndPoint = await postNewOrder(tempOrder);

        dispatch(postOrderHistorySuccess());
        return orderHistoryEndPoint;
      } catch (error) {
        dispatch(postOrderHistoryFailed(error as Error));
        console.log(error);
      }
    };
  };
