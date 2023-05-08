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
    resetData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
});

export const { resetData } = slice.actions;
export const { fetchStarted, fetchSuccess, fetchError } = slice.actions;
const SERVER_NEW_TRANSACTION_URL = "http://localhost:3333/transaction/create";
// const SERVER_NEW_TRANSACTION_URL =
//   "https://ng-cash-app-production.up.railway.app/transaction/create";
const SERVER_TRANSACTIONS_LIST_URL = "http://localhost:3333/transaction/list";
// const SERVER_TRANSACTIONS_LIST_URL =
//   "https://ng-cash-app-production.up.railway.app/transaction/list";

async function fetchData(
  dispatch: Dispatch<Action<string>>,
  fetchUrl: string,
  fetchOptions: {}
) {
  try {
    dispatch(fetchStarted());
    const response = await fetch(fetchUrl, fetchOptions);
    const data = await response.json();
    if (!response.ok) throw new Error("Error: " + data.error);
    dispatch(fetchSuccess(data));
  } catch (err) {
    if (err instanceof Error) dispatch(fetchError(err.message));
  }
}

export const fetchTransaction =
  (transactionData: ITransactionFormData) =>
  async (dispatch: Dispatch<Action<string>>) => {
    await fetchData(dispatch, SERVER_NEW_TRANSACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("jwt-token")}`,
      },
      body: JSON.stringify(transactionData),
    });
  };

export const fetchTransactionsList =
  () => async (dispatch: Dispatch<Action<string>>) => {
    await fetchData(dispatch, SERVER_TRANSACTIONS_LIST_URL, {
      method: "POST",
      headers: {
        Authorization: `${localStorage.getItem("jwt-token")}`,
      },
    });
  };

export default slice.reducer;
