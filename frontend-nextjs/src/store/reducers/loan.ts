import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../configureStore";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const initialState = {
  loading: false,
  data: {
    status: null,
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
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.data = initialState.data;
      state.error = action.payload;
    },
    clearLoanStatus: (state) => {
      state.data = initialState.data;
    },
  },
});

export const { fetchStarted, fetchSuccess, fetchError, clearLoanStatus } =
  slice.actions;

export const fetchLoan =
  (loanData: ILoan): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchStarted());
      const token = localStorage.getItem("jwt-token");
      const response = await fetch(SERVER_URL + "loan/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(loanData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      dispatch(fetchSuccess(data));
    } catch (err) {
      if (err instanceof Error) dispatch(fetchError(err.message));
    }
  };

export default slice.reducer;
