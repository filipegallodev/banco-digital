import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    fetchStarted: (state) => {
      state.loading = true;
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
  },
});

const { fetchStarted, fetchSuccess, fetchError } = slice.actions;
const SERVER_LOGIN_URL = "http://localhost:3333/login";
// const SERVER_LOGIN_URL = "https://ng-cash-app-production.up.railway.app/login";

export const fetchLogin =
  (loginData: ILogin) => async (dispatch: Dispatch<Action<string>>) => {
    try {
      dispatch(fetchStarted());
      const response = await fetch(SERVER_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) throw new Error("Error: " + response.status);
      const data = await response.json();
      dispatch(fetchSuccess(data));
    } catch (error) {
      if (error instanceof Error) dispatch(fetchError(error.message));
    }
  };

export default slice.reducer;
