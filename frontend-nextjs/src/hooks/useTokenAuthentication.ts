import { useRouter } from "next/router";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { fetchToken, resetState } from "@/store/reducers/user";
import { useEffect } from "react";

export default function useTokenAuthentication() {
  const { user } = useAppSelector((state: IReduxState) => state);
  const { login } = useAppSelector((state: IReduxState) => state);
  const route = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (!user.data?.validToken && token) dispatch(fetchToken(token));
    if (route.pathname === "/painel" && token) dispatch(fetchToken(token));
  }, [login, route]);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (user.error) {
      dispatch(resetState());
      route.push("/");
    }
    if (!token) {
      route.push("/");
    }
  }, [user.error]);

  return user;
}
