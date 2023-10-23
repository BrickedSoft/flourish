import { ReactNode, useRef, useState } from "react";
import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  useRadioGroup,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  footerContent,
  headerContent,
  successMessage,
} from "../../../assets/data/auth";
import { routes } from "../../../assets/data/routes";
import Layout from "../../../components/auth/Layout";
import SuccessMessage from "../../../components/auth/SuccessMessage";
import ButtonFull from "../../../components/common/button/ButtonFull";
import { useAppDispatch } from "../../../hooks/useStore";
import { signUp as signUpAction } from "../../../store/actions/authActions";
import { setStatus } from "../../../store/slices/userSlice";
import { SignUpTypes } from "../../../types/Form";
import { Status } from "../../../types/Status";
import { userTypes } from "../../../types/User";
import RadioCard from "./RadioUser";

const SignUpFormInit: SignUpTypes = {
  type: userTypes.CLIENT,
  email: "",
  password: "",
};

const messageVariants = {
  hidden: {
    x: "100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
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

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState(true);
  const [isFulfilled, setIsFulfilled] = useState(false);

  const prevState = useRef<number>(
    Object.keys(userTypes).indexOf(userTypes.CLIENT)
  );

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: SignUpFormInit });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "userType",
    defaultValue: userTypes.CLIENT.toUpperCase(),
    onChange: (value) => {
      prevState.current = Object.keys(userTypes).indexOf(value);
    },
  });

  const group = getRootProps();

  const onSubmit = async (data: SignUpTypes) => {
    const res = await dispatch(signUpAction(data));
    switch (res.meta.requestStatus) {
      case Status.FULFILLED:
        setIsFulfilled(true);
        setTimeout(() => {
          navigate(routes.signIn);

          setTimeout(() => {
            dispatch(setStatus(Status.IDLE));
          }, 500);
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
    <Layout header={headerContent.signUp} footer={footerContent.signUp}>
      {isFulfilled ? (
        <Box
          as={motion.div}
          variants={messageVariants}
          initial={"hidden"}
          animate={"visible"}
          exit={"exit"}
        >
          <SuccessMessage data={successMessage.signUp} />
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
          {/* ------------------------------- Radio Card ------------------------------- */}

          <FormControl>
            <Center>
              <Controller
                name="type"
                control={control}
                render={({ field: { onChange } }) => (
                  <Grid
                    templateColumns={"repeat(3,1fr)"}
                    gap={0}
                    justifyContent={"center"}
                    alignItems={"center"}
                    {...group}
                    onChange={onChange}
                  >
                    {(
                      Object.keys(userTypes) as Array<keyof typeof userTypes>
                    ).map((value) => {
                      const radio = getRadioProps({ value });
                      return (
                        <RadioCard
                          key={value}
                          {...radio}
                          prevState={prevState.current}
                        >
                          {value}
                        </RadioCard>
                      );
                    })}
                  </Grid>
                )}
              />
            </Center>
          </FormControl>

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
                ? "Email already exists"
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
            Sign Up
          </ButtonFull>
        </form>
      )}
    </Layout>
  );
};

export default SignUpForm;
