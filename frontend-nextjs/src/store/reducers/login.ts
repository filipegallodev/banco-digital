import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";

const initialState: ILoginReducerState = {
  loading: false,
  data: {
    status: null,
    token: null,
  },
  error: null,
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    fetchStarted: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      localStorage.setItem("jwt-token", action.payload.token);
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
    resetLoginData: (state) => {
      state.data = null;
    },
  },
});

export const { fetchStarted, fetchSuccess, fetchError, resetLoginData } =
  slice.actions;
const SERVER_URL = "http://localhost:3333/";
// const SERVER_URL = "https://ng-cash-app-production.up.railway.app/";

export const fetchLogin =
  (loginData: ILoginFormData) => async (dispatch: Dispatch<Action<string>>) => {
    try {
      dispatch(fetchStarted());
      const response = await fetch(SERVER_URL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      dispatch(fetchSuccess(data));
    } catch (err) {
      if (err instanceof Error) dispatch(fetchError(err.message));
    }
  };

export default slice.reducer;
