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
      state.data = null;
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
    },
  },
});

export const { resetState } = slice.actions;
const { fetchStarted, fetchSuccess, fetchError } = slice.actions;
const SERVER_VALIDATE_URL = "http://localhost:3333/validateToken";
// const SERVER_VALIDATE_URL = "https://ng-cash-app-production.up.railway.app/validateToken";

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
      if (!response.ok) throw new Error("Error: " + response.status);
      const data = await response.json();
      dispatch(fetchSuccess(data));
    } catch (error) {
      if (error instanceof Error) dispatch(fetchError(error.message));
    }
  };

export default slice.reducer;
