import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../configureStore";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const initialState = {
  loading: false,
  data: {
    status: null,
    loans: [],
    nextLoan: null,
  },
  error: null,
};

const slice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    fetchStarted: (state) => {
      state.loading = true;
      state.data = initialState.data;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.data = initialState.data;
      state.error = action.payload;
    },
    clearLoanStatus: (state) => {
      state.data.status = null;
      state.error = null;
    },
  },
});

export const { fetchStarted, fetchSuccess, fetchError, clearLoanStatus } =
  slice.actions;

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

export const fetchLoan =
  (loanData: ILoan): AppThunk =>
  async (dispatch) => {
    const token = localStorage.getItem("jwt-token");
    await fetchData(dispatch, "loan/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(loanData),
    });
  };

export const getLoans = (): AppThunk => async (dispatch) => {
  const token = localStorage.getItem("jwt-token");
  await fetchData(dispatch, "loan/list", {
    method: "POST",
    headers: {
      Authorization: `${token}`,
    },
  });
};

export default slice.reducer;
