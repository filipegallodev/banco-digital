import { combineReducers, configureStore } from "@reduxjs/toolkit";
import login from "./reducers/login";
import user from "./reducers/user";
import register from "./reducers/register";

const reducer = combineReducers({ user, login, register });
const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
