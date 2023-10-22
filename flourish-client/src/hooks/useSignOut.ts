import { useNavigate } from "react-router-dom";

import { routes } from "../assets/data/routes";
import { setIsSignedIn } from "../store/slices/flagSlice";
import { purgeUser } from "../store/slices/userSlice";
import { useAppDispatch } from "./useStore";
import { purgeQuestionnaire } from "../store/slices/questionnaireSlice";
import { resetInterceptors } from "../api/config/apiConfig";

export const useSignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    resetInterceptors();
    dispatch(purgeUser());
    dispatch(purgeQuestionnaire());
    dispatch(setIsSignedIn(false));
    navigate(routes.home);
  };

  return { signOut };
};
