import { fetchStarted, fetchSuccess, fetchError } from "../reducers/user";
import { Action, Dispatch } from "@reduxjs/toolkit";

export default async function fetchData(
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
