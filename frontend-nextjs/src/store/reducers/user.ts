import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";
import fetchData from "../utils/fetchData";

const slice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    fetchStarted: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
    resetState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
      localStorage.removeItem("jwt-token");
    },
  },
});

export const { fetchStarted, fetchSuccess, fetchError, resetState } =
  slice.actions;
const SERVER_VALIDATE_URL = "http://localhost:3333/token/validate";
// const SERVER_VALIDATE_URL = "https://ng-cash-app-production.up.railway.app/token/validate";
const SERVER_USER_UPDATE_URL = "http://localhost:3333/user/update";
// const SERVER_USER_UPDATE_URL = "https://ng-cash-app-production.up.railway.app/user/update";
const SERVER_EMAIL_UPDATE_URL = "http://localhost:3333/user/update/email";
// const SERVER_EMAIL_UPDATE_URL = "https://ng-cash-app-production.up.railway.app/user/update/email";
const SERVER_USER_DELETE_URL = "http://localhost:3333/user/delete";
// const SERVER_USER_DELETE_URL = "https://ng-cash-app-production.up.railway.app/user/delete";

export const fetchToken =
  (token: string) => async (dispatch: Dispatch<Action<string>>) => {
    await fetchData(dispatch, SERVER_VALIDATE_URL, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
    });
  };

export const fetchUserUpdate =
  (formData: IUserUpdateFormData) =>
  async (dispatch: Dispatch<Action<string>>) => {
    await fetchData(dispatch, SERVER_USER_UPDATE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("jwt-token")}`,
      },
      body: JSON.stringify(formData),
    });
  };

export const fetchEmailUpdate =
  (formData: IEmailUpdateFormData) =>
  async (dispatch: Dispatch<Action<string>>) => {
    await fetchData(dispatch, SERVER_EMAIL_UPDATE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("jwt-token")}`,
      },
      body: JSON.stringify(formData),
    });
  };

export const fetchUserDelete =
  () => async (dispatch: Dispatch<Action<string>>) => {
    await fetchData(dispatch, SERVER_USER_DELETE_URL, {
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem("jwt-token")}`,
      },
    });
  };

export default slice.reducer;
