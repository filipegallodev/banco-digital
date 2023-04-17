import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "transactions",
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
const SERVER_NEW_TRANSACTION_URL = "http://localhost:3333/transaction/create";
// const SERVER_NEW_TRANSACTION_URL =
//   "https://ng-cash-app-production.up.railway.app/transaction/create";

export const fetchTransaction =
  (transactionData: ITransactionData) =>
  async (dispatch: Dispatch<Action<string>>) => {
    try {
      dispatch(fetchStarted());
      const response = await fetch(SERVER_NEW_TRANSACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("jwt-token")}`,
        },
        body: JSON.stringify(transactionData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      dispatch(fetchSuccess(data));
    } catch (err) {
      if (err instanceof Error) dispatch(fetchError(err.message));
    }
  };

export default slice.reducer;
