import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
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
      state.data = initialState.data;
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
      state.data = initialState.data;
      state.error = action.payload;
    },
    clearLoginStatus: (state) => {
      state.data = initialState.data;
      state.error = null;
    },
  },
});

export const { fetchStarted, fetchSuccess, fetchError, clearLoginStatus } =
  slice.actions;

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
