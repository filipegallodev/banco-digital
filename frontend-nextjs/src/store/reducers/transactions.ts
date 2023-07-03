import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../configureStore";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const initialState: ITransactionReducerState = {
  loading: false,
  data: {
    status: null,
    attention: null,
    userAccountId: null,
    allTransactions: null,
    totalTransferValue: {
      receivedValue: null,
      sentValue: null,
      total: null,
    },
    filteredTransactions: null,
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
      if (state.data)
        state.data.filteredTransactions = state.data?.allTransactions
          ? state.data?.allTransactions
          : [];
      state.error = null;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
    filterTransactions: (
      state,
      { payload }: { payload: ITransactionFilter }
    ) => {
      if (!state.data) return;
      clearFilters();
      if (state.data.allTransactions) {
        const startDate = payload.start
          ? new Date(payload.start + "T00:00:00")
          : new Date("1900-01-01T00:00:00");
        const endDate = payload.end
          ? new Date(payload.end + "T24:00:00")
          : new Date();
        const newList = state.data.allTransactions.filter((transaction) => {
          const transactionDate = new Date(
            transaction.createdAt.replace(
              /(\d{2})\/(\d{2})\/(\d{4})/g,
              "$3/$2/$1"
            )
          );
          if (transactionDate >= startDate && transactionDate <= endDate)
            return transaction;
        });
        state.data.filteredTransactions = newList;
        if (payload.type === "sent") {
          const newList = state.data.filteredTransactions?.filter(
            ({ originAccountId }) =>
              state.data?.userAccountId === originAccountId
          );
          state.data.filteredTransactions = newList;
        }
        if (payload.type === "received") {
          const newList = state.data.filteredTransactions?.filter(
            ({ destinationAccountId }) =>
              state.data?.userAccountId === destinationAccountId
          );
          state.data.filteredTransactions = newList;
        }
      }
    },
    clearFilters: (state) => {
      if (state.data)
      state.data.filteredTransactions = state.data?.allTransactions
      ? state.data?.allTransactions
      : [];
    },
    clearTransactionStatus: (state) => {
      if (state.data) state.data.status = null;
      state.error = null;
    },
  },
});

export const {
  fetchStarted,
  fetchSuccess,
  fetchError,
  filterTransactions,
  clearFilters,
  clearTransactionStatus,
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
