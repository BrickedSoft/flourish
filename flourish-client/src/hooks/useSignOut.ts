import { useNavigate } from "react-router-dom";

import { routes } from "../assets/data/routes";
import { setIsSignedIn } from "../store/slices/flagSlice";
import { purgeUser } from "../store/slices/userSlice";
import { useAppDispatch } from "./useStore";

export const useSignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(purgeUser());
    dispatch(setIsSignedIn(false));
    navigate(routes.home);
  };

  return { signOut };
};
