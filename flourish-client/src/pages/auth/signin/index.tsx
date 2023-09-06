import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";

import ButtonFull from "../../../components/common/button/ButtonFull";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { setSignInData } from "../../../store/slices/formSlice";
import { SignIn } from "../../../types/FormTypes";

export default function HookForm() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form?.signIn);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: formData });

  const onSubmit = (data: SignIn) => dispatch(setSignInData(data));

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
        SignIn
      </ButtonFull>
    </form>
  );
}