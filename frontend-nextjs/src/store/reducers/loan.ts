import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../configureStore";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const initialState = {
  loading: false,
  data: {
    status: null,
    loans: <ILoan[]>[],
    nextLoan: null,
    filteredLoans: <ILoan[]>[],
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
      state.data.filteredLoans = state.data.loans;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.data = initialState.data;
      state.error = action.payload;
    },
    filterLoans: (state, { payload }: { payload: ILoanFilter }) => {
      if (!state.data) return;
      clearLoanFilters();
      if (state.data.loans) {
        const startDate = payload.start
          ? new Date(payload.start + "T00:00:00")
          : new Date("1900-01-01T00:00:00");
        const endDate = payload.end
          ? new Date(payload.end + "T24:00:00")
          : new Date();
        const newList = state.data.loans.filter((loan) => {
          const loanDate = new Date(
            loan.requestedAt.replace(/(\d{2})\/(\d{2})\/(\d{4})/g, "$3/$2/$1")
          );
          if (loanDate >= startDate && loanDate <= endDate) return loan;
        });
        state.data.filteredLoans = newList;
      }
    },
    clearLoanFilters: (state) => {
      if (state.data) state.data.filteredLoans = state.data.loans;
    },
    clearLoanStatus: (state) => {
      state.data.status = null;
      state.error = null;
    },
  },
});

export const {
  fetchStarted,
  fetchSuccess,
  fetchError,
  filterLoans,
  clearLoanFilters,
  clearLoanStatus,
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

export const fetchLoan =
  (loanData: ILoanForm): AppThunk =>
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
