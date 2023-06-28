import { Action, Dispatch, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../configureStore";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const initialState = {
  loading: false,
  data: {
    status: null,
    cards: <ICard[]>[],
  },
  error: null,
};

const slice = createSlice({
  name: "card",
  initialState,
  reducers: {
    fetchStarted: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCardStatus: (state) => {
      state.data.status = null;
      state.error = null;
    },
    toggleCardHidden: (state, action) => {
      if (state.data.cards) {
        state.data.cards = state.data.cards.map((card) => {
          if (card.type === action.payload.type)
            return { ...card, hidden: action.payload.hidden };
          return card;
        });
      }
    },
  },
});

export const {
  fetchStarted,
  fetchSuccess,
  fetchError,
  clearCardStatus,
  toggleCardHidden,
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

export const fetchCard =
  (cardData: ICardForm): AppThunk =>
  async (dispatch) => {
    const token = localStorage.getItem("jwt-token");
    await fetchData(dispatch, "card/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(cardData),
    });
  };

export const getCards = (): AppThunk => async (dispatch) => {
  const token = localStorage.getItem("jwt-token");
  await fetchData(dispatch, "cards", {
    method: "POST",
    headers: {
      Authorization: `${token}`,
    },
  });
};

export default slice.reducer;
