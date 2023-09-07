import { ReactNode, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { buttonData } from "../../../assets/data/auth";
import { nav } from "../../../assets/data/nav";
import ButtonFull from "../../../components/common/button/ButtonFull";
import { useAppDispatch } from "../../../hooks/useStore";
import { signIn as signInAction } from "../../../store/actions/authActions";
import { SignIn as SignInType } from "../../../types/Form";
import { Status } from "../../../types/Status";
import { setIsSignedIn } from "../../../store/slices/flagSlice";

const SignInFormInit: SignInType = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: SignInFormInit });

  const onSubmit = async (data: SignInType) => {
    const res = await dispatch(signInAction(data));
    switch (res.meta.requestStatus) {
      case Status.FULFILLED:
        dispatch(setIsSignedIn(true));
        navigate(nav.dashboard);
        break;
      case Status.REJECTED:
        setIsValid(false);
        break;
      default:
        break;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2.4rem",
      }}
    >
      {/* ---------------------------------- Email --------------------------------- */}

      <FormControl
        isInvalid={errors.email || !isValid ? true : false}
        display={"flex"}
        flexDir={"column"}
        gap={"8"}
        onChange={() => setIsValid(true)}
      >
        <FormLabel
          htmlFor="email"
          fontSize={"xl"}
          color={"font.muted2"}
          fontWeight={"normal"}
        >
          Email address
        </FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="you@mail.com"
          {...register("email", {
            required: "This is required",
          })}
          px={"16"}
          py={"24"}
          fontSize={"xl"}
          borderWidth={"2"}
          borderRadius={"xl"}
        />
        <FormErrorMessage fontSize={"md"}>
          {errors?.email
            ? (errors?.email?.message as React.ReactNode)
            : !isValid
            ? "Invalid email or password"
            : null}
        </FormErrorMessage>
      </FormControl>

      {/* -------------------------------- Password -------------------------------- */}

      <FormControl
        isInvalid={errors.password || !isValid ? true : false}
        display={"flex"}
        flexDir={"column"}
        gap={"8"}
        onChange={() => setIsValid(true)}
      >
        <FormLabel
          htmlFor="password"
          fontSize={"xl"}
          color={"font.muted2"}
          fontWeight={"normal"}
        >
          Password
        </FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "This is required",
            minLength: {
              value: 8,
              message: "Minimum length should be 8",
            },
          })}
          px={"16"}
          py={"24"}
          fontSize={"xl"}
          borderWidth={"none"}
          borderRadius={"xl"}
        />
        <FormErrorMessage fontSize={"md"}>
          {errors?.password && (errors?.password?.message as ReactNode)}
        </FormErrorMessage>
      </FormControl>

      <ButtonFull
        mt={"12"}
        isLoading={isSubmitting}
        px={"16"}
        py={"24"}
        fontSize={"xl"}
        type="submit"
        borderWidth={"2px"}
      >
        {buttonData.signin.title}
      </ButtonFull>
    </form>
  );
};

export default SignInForm;
