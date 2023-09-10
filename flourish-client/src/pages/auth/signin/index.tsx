import { ReactNode, useState } from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  footerContent,
  headerContent,
  successMessage,
} from "../../../assets/data/auth";
import { routes } from "../../../assets/data/routes";
import ButtonFull from "../../../components/common/button/ButtonFull";
import { useAppDispatch } from "../../../hooks/useStore";
import { signIn as signInAction } from "../../../store/actions/authActions";
import { setIsSignedIn } from "../../../store/slices/flagSlice";
import { SignIn as SignInType } from "../../../types/Form";
import { Status } from "../../../types/Status";
import Layout from "../component/Layout";
import SuccessMessage from "../component/SuccessMessage";

const SignInFormInit: SignInType = {
  email: "",
  password: "",
};

const messageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.25,
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  exit: {
    x: "100vw",
  },
};

const SignInForm = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);
  const [isFulfilled, setIsFulfilled] = useState(false);

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
        setIsFulfilled(true);
        setTimeout(() => {
          dispatch(setIsSignedIn(true));
          navigate(routes.dashboard);
        }, 3000);

        break;
      case Status.REJECTED:
        setIsValid(false);
        break;
      default:
        break;
    }
  };

  return (
    <Layout header={headerContent.signIn} footer={footerContent.signIn}>
      {isFulfilled ? (
        <Box
          as={motion.div}
          variants={messageVariants}
          initial={"hidden"}
          animate={"visible"}
          exit={"exit"}
        >
          <SuccessMessage data={successMessage.signIn} />
        </Box>
      ) : (
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
          >
            {footerContent.signUp.title}
          </ButtonFull>
        </form>
      )}
    </Layout>
  );
};

export default SignInForm;
