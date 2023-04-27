import { useRouter } from "next/router";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { fetchToken, resetState } from "@/store/reducers/user";
import { useEffect } from "react";

export default function useTokenAuthentication() {
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.user
  );
  const { login } = useAppSelector((state: IReduxState) => state);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (router.pathname !== "/painel" && !data?.validToken && token && !loading) {
      dispatch(fetchToken(token));
      return;
    }
  }, [dispatch, router, login]);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (router.pathname === "/painel" && token && !loading && !login.data) {
      dispatch(fetchToken(token));
    }
  }, [dispatch, router]);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (error) {
      dispatch(resetState());
      router.push("/");
    }
    if (!token) {
      router.push("/");
    }
  }, [dispatch, error]);

  return { data, loading, error };
}
