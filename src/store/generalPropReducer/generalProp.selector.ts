import { createSelector } from "reselect";
import { ReduxState } from "store/rootReducer.redux";

export const selectGeneralPropReducer = (state: ReduxState) =>
  state.generalPropReducer;

export const selectIsUserMenuOpened = createSelector(
  [selectGeneralPropReducer],
  (userReducer) => userReducer.isUserMenuOpened
);

export const selectIsProductCardOpened = createSelector(
  [selectGeneralPropReducer],
  (userReducer) => userReducer.isProductCardOpened
);

export const selectTheme = createSelector(
  [selectGeneralPropReducer],
  (state) => state.theme
);

export const selectPath = createSelector(
  [selectGeneralPropReducer],
  (state) => state.path
);

export const selectViewLimiter = createSelector(
  [selectGeneralPropReducer],
  (state) => state.viewLimiter
);
