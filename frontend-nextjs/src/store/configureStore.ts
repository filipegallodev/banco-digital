import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import login from "./reducers/login";
import user from "./reducers/user";
import register from "./reducers/register";
import transactions from "./reducers/transactions";
import modal from "./reducers/modal";
import loan from "./reducers/loan";
import card from "./reducers/card";

const reducer = combineReducers({
  user,
  login,
  register,
  transactions,
  modal,
  loan,
  card,
});
const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
