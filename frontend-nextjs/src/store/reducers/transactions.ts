import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../configureStore";

const initialState: ITransactionReducerState = {
  loading: false,
  data: {
    status: null,
    allTransactions: undefined,
    totalTransferValue: undefined,
  },
  error: null,
};

const slice = createSlice({
  name: "transactions",
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
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
    clearTransactionStatus: (state) => {
      if (state.data) state.data.status = null;
      state.error = null;
    },
  },
});

export const { fetchStarted, fetchSuccess, fetchError, clearTransactionStatus } =
  slice.actions;
const SERVER_URL = "http://localhost:3333/";
// const SERVER_URL = "https://ng-cash-app-production.up.railway.app/";

const fetchData = async (
  dispatch: Dispatch<Action<string>>,
  fetchPath: string,
  fetchOptions: {}
) => {
  try {
    dispatch(fetchStarted());
    const response = await fetch(SERVER_URL + fetchPath, fetchOptions);
    const data = await response.json();
    if (!response.ok) throw new Error("Error: " + data.error);
    dispatch(fetchSuccess(data));
  } catch (err) {
    if (err instanceof Error) dispatch(fetchError(err.message));
  }
};

export const fetchTransaction =
  (transactionData: ITransactionFormData): AppThunk =>
  async (dispatch) => {
    const token = localStorage.getItem("jwt-token");
    await fetchData(dispatch, "transaction/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(transactionData),
    });
  };

export const fetchTransactionsList = (): AppThunk => async (dispatch) => {
  const token = localStorage.getItem("jwt-token");
  await fetchData(dispatch, "transaction/list", {
    method: "POST",
    headers: {
      Authorization: `${token}`,
    },
  });
};

export default slice.reducer;
