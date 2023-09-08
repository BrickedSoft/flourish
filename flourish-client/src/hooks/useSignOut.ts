import { useNavigate } from "react-router-dom";

import { nav } from "../assets/data/nav";
import { setIsSignedIn } from "../store/slices/flagSlice";
import { purgeUser } from "../store/slices/userSlice";
import { useAppDispatch } from "./useStore";

export const useSignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(setIsSignedIn(false));
    dispatch(purgeUser());
    navigate(nav.home);
  };

  return { signOut };
};
