import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  IsModal,
  IsRefNotNull,
  IsRefNull
} from "../../types/checkTypes/modalCheck.typeGuards";

const Modal: FC<PropsWithChildren> = ({ children }) => {
  const elRef = useRef<null | HTMLElement>(null);

  if (IsRefNull(elRef.current)) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");

    if (IsModal(modalRoot) && IsRefNotNull(elRef.current)) {
      modalRoot.appendChild(elRef.current);

      return () => {
        modalRoot.removeChild(elRef.current as HTMLElement);
      };
    } else return;
  }, []);

  return createPortal(<>{children}</>, elRef.current as HTMLElement);
};

export default Modal;
