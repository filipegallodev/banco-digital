import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../configureStore";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const initialState: IUserReducerState = {
  loading: false,
  data: {
    user: null,
    validToken: null,
    status: null,
  },
  error: null,
};

const slice = createSlice({
  name: "user",
  initialState,
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
      state.error = action.payload;
    },
    resetState: (state) => {
      state.loading = false;
      state.data = initialState.data;
      state.error = null;
      localStorage.removeItem("jwt-token");
    },
    clearUserStatus: (state) => {
      state.data.status = null;
      state.error = null;
    },
  },
});

export const {
  fetchStarted,
  fetchSuccess,
  fetchError,
  resetState,
  clearUserStatus,
} = slice.actions;

const fetchData = async (
  dispatch: Dispatch<Action<string>>,
  fetchPath: string,
  fetchOptions: {}
) => {
  try {
    dispatch(fetchStarted());
    const response = await fetch(SERVER_URL + fetchPath, fetchOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    dispatch(fetchSuccess(data));
  } catch (err) {
    if (err instanceof Error) dispatch(fetchError(err.message));
  }
};

export const fetchToken =
  (token: string): AppThunk =>
  async (dispatch) => {
    fetchData(dispatch, "token/validate", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
    });
  };

export const fetchUserUpdate =
  (formData: IUserUpdateFormData): AppThunk =>
  (dispatch) => {
    const token = localStorage.getItem("jwt-token");
    fetchData(dispatch, "user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(formData),
    });
  };

export const fetchEmailUpdate =
  (formData: IEmailUpdateFormData): AppThunk =>
  (dispatch) => {
    const token = localStorage.getItem("jwt-token");
    fetchData(dispatch, "user/update/email", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(formData),
    });
  };

export const fetchPasswordUpdate =
  (formData: IPasswordUpdateFormData): AppThunk =>
  (dispatch) => {
    const token = localStorage.getItem("jwt-token");
    fetchData(dispatch, "user/update/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(formData),
    });
  };

export const fetchUserDelete = (): AppThunk => (dispatch) => {
  const token = localStorage.getItem("jwt-token");
  fetchData(dispatch, "user/delete", {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
    },
  });
};

export default slice.reducer;
