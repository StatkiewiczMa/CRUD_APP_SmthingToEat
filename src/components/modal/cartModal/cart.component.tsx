import { Icon } from "@iconify/react";
import { H2 } from "../../../global.styles";

import Modal from "../modal.component";
import {
  Cart,
  CartLogoContainer,
  CartLogoText,
  CartContainer,
  CartGoToCheckout
} from "./cart.styles";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import React from "react";
import { toggleCartMenu } from "store/cartReducer/cart.actions";
import {
  selectCartItems,
  selectCartTotal
} from "store/cartReducer/cart.selector";
import { CartCard } from "./cartCard/cartCard.component";
import Button, { BUTTON_TYPE_CLASSES } from "components/button/button.component";

type CartClosingHandlerType<T extends HTMLElement> = React.MouseEvent<
  T,
  MouseEvent
> & {
  target: T;
};

export const CartModal = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);

  const cartClosingHandler = (
    event: CartClosingHandlerType<HTMLDivElement>
  ): void => {
    if (event.target.id === "CartContainer") {
      dispatch(toggleCartMenu());
    }
  };

  return (
    <Modal>
      <Cart
        id="CartContainer"
        onClick={(e) => {
          cartClosingHandler(e as CartClosingHandlerType<HTMLDivElement>);
        }}
      >
        <CartContainer>
          <CartLogoContainer>
            <Icon
              icon="fluent-emoji-high-contrast:polar-bear"
              color="#ffb703"
              width="64"
              height="64"
            />
            <CartLogoText>
              <H2>Koszyk</H2>
            </CartLogoText>
          </CartLogoContainer>
          {cartItems.map((cartItem) => {
            return <CartCard key={cartItem.id} cartItem={cartItem} />;
          })}
          <CartGoToCheckout>

          <Button buttonType={BUTTON_TYPE_CLASSES.userMenuFuncButton}>{`Do kasy`}</Button>
          <span>{`W sumie: ${cartTotal}$`}</span>
          </CartGoToCheckout>
        </CartContainer>
      </Cart>
    </Modal>
  );
};