import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";

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

export const { resetState } = slice.actions;
const { fetchStarted, fetchSuccess, fetchError } = slice.actions;
const SERVER_VALIDATE_URL = "http://localhost:3333/token/validate";
// const SERVER_VALIDATE_URL = "https://ng-cash-app-production.up.railway.app/token/validate";
const SERVER_USER_UPDATE_URL = "http://localhost:3333/user/update";
// const SERVER_USER_UPDATE_URL = "https://ng-cash-app-production.up.railway.app/user/update";

export const fetchToken =
  (token: string) => async (dispatch: Dispatch<Action<string>>) => {
    try {
      dispatch(fetchStarted());
      const response = await fetch(SERVER_VALIDATE_URL, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error("Error: " + data.error);
      dispatch(fetchSuccess(data));
    } catch (err) {
      if (err instanceof Error) dispatch(fetchError(err.message));
    }
  };

export const fetchUserUpdate =
  (formData: IUserUpdateFormData) =>
  async (dispatch: Dispatch<Action<string>>) => {
    try {
      dispatch(fetchStarted());
      const response = await fetch(SERVER_USER_UPDATE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("jwt-token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error("Error: " + data.error);
      dispatch(fetchSuccess(data));
    } catch (err) {
      if (err instanceof Error) dispatch(fetchError(err.message));
    }
  };

export default slice.reducer;
