import { DeliveryData, Order, OrderItem } from "store/userReducer/user.reducer";

export const orderCreator= (
  id: string,
  time: string,
  price: number,
  itemsBought: OrderItem[],
  deliveryData: DeliveryData,
  deliveryPrice: number
):Order => {
  return {
    id,
    time,
    price,
    itemsBought,
    deliveryData,
    deliveryPrice
  };
};
