import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const initialState: IRegisterReducerState = {
  loading: false,
  data: {
    status: null,
  },
  error: null,
};

const slice = createSlice({
  name: "register",
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
    clearRegisterStatus: (state) => {
      state.data = initialState.data;
      state.error = null;
    },
  },
});

export const { fetchStarted, fetchSuccess, fetchError, clearRegisterStatus } =
  slice.actions;

export const fetchRegister =
  (registerData: IRegisterFormData) =>
  async (dispatch: Dispatch<Action<string>>) => {
    try {
      dispatch(fetchStarted());
      const response = await fetch(SERVER_URL + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      dispatch(fetchSuccess(data));
    } catch (err) {
      if (err instanceof Error) dispatch(fetchError(err.message));
    }
  };

export default slice.reducer;
