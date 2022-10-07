import { H4 } from "global.styles";
import { FC, useState } from "react";

import { Order } from "store/userReducer/user.reducer";

import {
  OrderItemContainer,
  OrderItemHeader,
  OrderItemContent,
  OrderItemInfoHeader,
  OrderDescription,
  Id,
  Time,
  Total,
  UserInfo,
  ItemsInfo,
  PayDeliveryInfo,
  AdresInfo,
  Info
} from "./orderItem.styles";

type OrderItemProps = {
  orderItem: Order;
};

//   Order{
//     id: string;
//     time: string;
//     price: number;
//     itemsBought: OrderItem[];
//     deliveryData: DeliveryData;
// }
export const OrderItem: FC<OrderItemProps> = ({ orderItem }) => {
  const { id, time, price, itemsBought, deliveryData } = orderItem;
  const {
    name,
    lastName,
    email,
    city,
    street,
    homeAdress,
    zip,
    deliveryMethod,
    payMethod
  } = deliveryData;

  const [info, setInfo] = useState(false);
  // const removeItemHandler = () =>
  //   dispatch(removeItemFromCart(cartItems, orderItem));
  console.log(`itemsBought: `, itemsBought);
  console.log(`deliveryData: `, deliveryData);
  return (
    <OrderItemContainer>
      <OrderItemContent>
        <OrderItemHeader onClick={() => setInfo(!info)}>
          <Id>{id}</Id>
          <Time>{time}</Time>

          <Total>{`${price}$`}</Total>

          {/* <RemoveButton
        className="remove-button"
        onClick={() =>
          dispatch(removeItemFromCart(cartItems, orderItem, "all"))
        }
        >
        &#10005;
      </RemoveButton> */}
        </OrderItemHeader>
        {info ? (
          <>
            <OrderItemInfoHeader>
              <UserInfo>
                <H4>{`Użytkownik`}</H4>
                <Info>{`Name: ${name} ${lastName}`}</Info>
                <Info>{`Email: ${email} `}</Info>
              </UserInfo>

              <ItemsInfo>
                <H4>{`Przedmioty`}</H4>
                {itemsBought.length > 0 &&
                  itemsBought.map((item) => <Info key={item.id}>
                    {`${item.quantity}*${item.price}$ ${item.name}`}
                    
                    </Info>)}
              </ItemsInfo>
              <PayDeliveryInfo>
                <H4> {`Płatność`}</H4>
                <Info>{`Dostawa: ${deliveryMethod} `}</Info>
                <Info>{`Płatność: ${payMethod} `}</Info>
              </PayDeliveryInfo>
              <AdresInfo>
                <H4>{`Adres`}</H4>
                <Info>{`Miasto: ${city} `}</Info>
                <Info>{`Ulica: ${street} `}</Info>
                <Info>{`Dom: ${homeAdress} `}</Info>
                <Info>{`Kod pocztowy: ${zip} `}</Info>
              </AdresInfo>
            </OrderItemInfoHeader>
          </>
        ):(<OrderDescription>Kliknij aby zobaczyć szczegóły zamówienia</OrderDescription>)}
      </OrderItemContent>
    </OrderItemContainer>
  );
};