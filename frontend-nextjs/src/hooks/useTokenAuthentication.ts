import { useRouter } from "next/router";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { fetchToken, resetState } from "@/store/reducers/user";
import { useEffect } from "react";

export default function useTokenAuthentication() {
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.user
  );
  const route = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (!data?.validToken && token && !loading) {
      dispatch(fetchToken(token));
      return;
    }
    if (route.pathname === "/painel" && token && !loading)
      dispatch(fetchToken(token));
  }, [dispatch, route]);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (error) {
      dispatch(resetState());
      route.push("/");
    }
    if (!token) {
      route.push("/");
    }
  }, [dispatch, route, error]);

  return { data, loading, error };
}
