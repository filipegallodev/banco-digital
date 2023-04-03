import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/configureStore";

export const useAppDispatch: () => AppDispatch = useDispatch;
