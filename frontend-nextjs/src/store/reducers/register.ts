import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "register",
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
  },
});

const { fetchStarted, fetchSuccess, fetchError } = slice.actions;
const SERVER_REGISTER_URL = "http://localhost:3333/register";
// const SERVER_REGISTER_URL =
//   "https://ng-cash-app-production.up.railway.app/register";

export const fetchRegister =
  (registerData: { username: string; password: string }) =>
  async (dispatch: Dispatch<Action<string>>) => {
    try {
      dispatch(fetchStarted());
      const response = await fetch(SERVER_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      if (!response.ok) throw new Error("Erro ao realizar cadastro.");
      const data = await response.json();
      dispatch(fetchSuccess(data));
    } catch (error) {
      if (error instanceof Error) dispatch(fetchError(error.message));
    }
  };

export default slice.reducer;
