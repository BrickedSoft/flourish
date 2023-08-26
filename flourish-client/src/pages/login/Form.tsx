import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import logo from "../../assets/img/logo.png";
import Container from "../../components/common/Container";
import ButtonFull from "../../components/common/button/ButtonFull";
import { setLoginData } from "../../store/slices/formSlice";

export default function HookForm() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form?.login);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: formData });

  const onSubmit = (data: any) => dispatch(setLoginData(data));

  return (
    <Container maxW={"2xl"}>
      <Flex flexDir={"column"} gap={"44"}>
        <Link
          href={"/"}
          _focus={{
            boxShadow: "none",
          }}
        >
          <Image src={logo} h={"20"} w={"auto"} alt={"logo"} />
        </Link>

        <Flex flexDir={"column"} gap={"16"}>
          <Heading
            color="font.secondary"
            fontSize="7xl"
            lineHeight="shorter"
            letterSpacing="tight"
            fontWeight="semibold"
          >
            Login
          </Heading>
          <Text fontSize={"xl"} color={"font.muted2"}>
            Welcome back! Please enter your credentials.
          </Text>
        </Flex>

        <>
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
                fontSize={"lg"}
                borderWidth={"2"}
                borderRadius={"lg"}
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
                fontSize={"lg"}
                borderWidth={"none"}
                borderRadius={"lg"}
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
              Login
            </ButtonFull>
          </form>

          <DevTool control={control} />
        </>

        <Flex
          gap={"12"}
          alignItems={"baseline"}
          justifyContent={"center"}
          justifySelf={"flex-end"}
        >
          <Text fontSize={"lg"} color={"font.muted2"}>
            Don't have an account?
          </Text>
          <Link
            href={"/signup"}
            fontSize={"xl"}
            fontWeight={"medium"}
            color={"font.primary"}
          >
            Sign Up
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}
