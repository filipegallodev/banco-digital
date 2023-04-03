import { combineReducers, configureStore } from "@reduxjs/toolkit";
import login from "./reducers/login";
import user from "./reducers/user";

const reducer = combineReducers({ login, user });
const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
