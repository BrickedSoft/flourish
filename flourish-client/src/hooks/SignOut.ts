import { useAppDispatch } from "./useStore";
import { setIsSignedIn } from "../store/slices/flagSlice";
import { persistor } from "../store/store";

export const useSignOut = () => {
  const dispatch = useAppDispatch();

  const signOut = async () => {
    persistor.pause();
    await persistor.flush();
    await persistor.purge();

    dispatch(setIsSignedIn(false));
  };

  return { signOut };
};
