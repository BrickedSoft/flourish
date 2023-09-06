import {
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  useRadioGroup,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { userTypes } from "../../../types/User";
import ButtonFull from "../../../components/common/button/ButtonFull";
import { useAppDispatch } from "../../../hooks/useStore";
import { signUp } from "../../../store/actions/authActions";
import { SignUp } from "../../../types/Form";
import RadioCard from "./RadioCard";

const SignUpFormInit: SignUp = {
  type: userTypes.CLIENT,
  name: "test",
  email: "",
  password: "",
};

const SignUpForm = () => {
  const dispatch = useAppDispatch();

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
    defaultValue: userTypes.CLIENT,
    onChange: (value) => {
      prevState.current = Object.keys(userTypes).indexOf(value);
    },
  });

  const group = getRootProps();

  return (
    <form
      onSubmit={handleSubmit((data: SignUp) =>
        dispatch(signUp({ ...data, name: "test" }))
      )}
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
            render={({ field: { onChange, value } }) => (
              <Grid
                templateColumns={"repeat(3,1fr)"}
                gap={0}
                justifyContent={"center"}
                alignItems={"center"}
                {...group}
                onChange={onChange}
              >
                {(Object.keys(userTypes) as Array<keyof typeof userTypes>).map(
                  (value) => {
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
                  }
                )}
              </Grid>
            )}
          />
        </Center>
      </FormControl>

      {/* ---------------------------------- Email --------------------------------- */}

      <FormControl
        isInvalid={errors.email ? true : false}
        display={"flex"}
        flexDir={"column"}
        gap={"8"}
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
          {errors?.email && (errors?.email?.message as React.ReactNode)}
        </FormErrorMessage>
      </FormControl>

      {/* -------------------------------- Password -------------------------------- */}

      <FormControl
        isInvalid={errors.password ? true : false}
        display={"flex"}
        flexDir={"column"}
        gap={"8"}
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
        Sign Up
      </ButtonFull>
    </form>
  );
};

export default SignUpForm;
