import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";

const initialState: IUserReducerState = {
  loading: false,
  data: {
    user: null,
    validToken: null,
    status: null,
  },
  error: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchStarted: (state) => {
      state.loading = true;
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
    resetState: (state) => {
      state.loading = false;
      state.data = initialState.data;
      state.error = null;
      localStorage.removeItem("jwt-token");
    },
    clearStatus: (state) => {
      state.data.status = null;
    },
  },
});

export const {
  fetchStarted,
  fetchSuccess,
  fetchError,
  resetState,
  clearStatus,
} = slice.actions;
const SERVER_URL = "http://localhost:3333/";
// const SERVER_URL = "https://ng-cash-app-production.up.railway.app/";

async function fetchData(
  dispatch: Dispatch<Action<string>>,
  fetchPath: string,
  fetchOptions: {}
) {
  try {
    dispatch(fetchStarted());
    const response = await fetch(SERVER_URL + fetchPath, fetchOptions);
    const data = await response.json();
    if (!response.ok) throw new Error("Error: " + data.error);
    dispatch(fetchSuccess(data));
  } catch (err) {
    if (err instanceof Error) dispatch(fetchError(err.message));
  }
}

export const fetchToken =
  (token: string) => async (dispatch: Dispatch<Action<string>>) => {
    await fetchData(dispatch, "token/validate", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
    });
  };

export const fetchUserUpdate =
  (formData: IUserUpdateFormData) =>
  async (dispatch: Dispatch<Action<string>>) => {
    const token = localStorage.getItem("jwt-token");
    await fetchData(dispatch, "user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(formData),
    });
  };

export const fetchEmailUpdate =
  (formData: IEmailUpdateFormData) =>
  async (dispatch: Dispatch<Action<string>>) => {
    const token = localStorage.getItem("jwt-token");
    await fetchData(dispatch, "user/update/email", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(formData),
    });
  };

export const fetchUserDelete =
  () => async (dispatch: Dispatch<Action<string>>) => {
    const token = localStorage.getItem("jwt-token");
    await fetchData(dispatch, "user/delete", {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    });
  };

export default slice.reducer;
