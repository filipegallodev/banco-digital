import { useRouter } from "next/router";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { fetchToken } from "@/store/reducers/user";
import { useEffect } from "react";

export default function useTokenAuthentication() {
  const { data, loading, error } = useAppSelector((state) => state.user);
  const { login } = useAppSelector((state) => state);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (
      router.pathname !== "/painel" &&
      !data.validToken &&
      token &&
      !loading
    ) {
      dispatch(fetchToken(token));
    }
    if (
      router.pathname === "/painel" &&
      token &&
      !loading &&
      !login.data?.token
    ) {
      dispatch(fetchToken(token));
    }
  }, [dispatch, router, login]);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (!token) {
      router.push("/");
    }
  }, [dispatch, error]);

  return { data, loading, error };
}
