import Button, {
  BUTTON_TYPE_CLASSES
} from "components/button/button.component";
import { BaseSyntheticEvent, FC } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";
import { FormButtonsContainer } from "./formButtons.styles";

import { resetFormHandler } from "../../../utils/checkoutForm/formHandlers.utils";
import { setDelivery } from "store/orderHistory/orderHistory.action";
import { useAppDispatch } from "hooks/hooks";

type FormButtonsProps = {
  reset: UseFormReset<FieldValues>;
  submitHandler: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
};

export const FormButtons: FC<FormButtonsProps> = ({ reset, submitHandler }) => {
  const dispatch = useAppDispatch();

  return (
    <FormButtonsContainer>
      <Button
        id="submitFormButton"
        type="submit"
        buttonType={BUTTON_TYPE_CLASSES.formButton}
        onClick={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        Zamawiam
      </Button>
      <Button
        id="reset"
        buttonType={BUTTON_TYPE_CLASSES.formButton}
        onClick={(e) => {
          e.preventDefault();
          dispatch(setDelivery("None"));
          reset({ ...resetFormHandler() });
        }}
      >
        Wyczyść formularz
      </Button>
    </FormButtonsContainer>
  );
};
