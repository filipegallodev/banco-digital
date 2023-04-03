import { combineReducers, configureStore } from "@reduxjs/toolkit";
import login from "./reducers/login";

const reducer = combineReducers({ login });
const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
