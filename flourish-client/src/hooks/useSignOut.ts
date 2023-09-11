import { useNavigate } from "react-router-dom";

import { routes } from "../assets/data/routes";
import { setIsSignedIn } from "../store/slices/flagSlice";
import { purgeUser } from "../store/slices/userSlice";
import { useAppDispatch } from "./useStore";
import { purgeQuestionnaire } from "../store/slices/questionnaireSlice";

export const useSignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(purgeUser());
    dispatch(purgeQuestionnaire());
    dispatch(setIsSignedIn(false));
    navigate(routes.home);
    navigate(0);
  };

  return { signOut };
};
