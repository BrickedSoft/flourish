import { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Link,
  Text,
  useRadioGroup,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import logo from "../../assets/img/logo.png";
import ButtonFull from "../../components/common/button/ButtonFull";
import { setSignupData } from "../../store/slices/formSlice";
import { signupContent, userTypes } from "../../assets/data/signup";
import RadioCard from "./RadioCard";
import { Signup } from "../../types/FormTypes";

export default function HookForm() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form?.signup);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: formData });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "userType",
    defaultValue: userTypes[0],
  });

  const group = getRootProps();

  const onSubmit = (data: Signup) => dispatch(setSignupData(data));

  return (
    <Flex
      maxW={"2xl"}
      h={"full"}
      px={"32"}
      flexDir={"column"}
      alignItems={"space-between"}
      justifyContent={"space-between"}
    >
      <Link
        href={"/"}
        alignSelf={"end"}
        _focus={{
          boxShadow: "none",
        }}
        mb={"16"}
      >
        <Image src={logo} h={"14"} w={"auto"} alt={"logo"} />
      </Link>
      <Flex flexDir={"column"} gap={"44"}>
        <Flex flexDir={"column"} gap={"16"}>
          <Heading
            color="font.secondary"
            fontSize="6xl"
            textAlign={"center"}
            lineHeight="shorter"
            letterSpacing="tighter"
            fontWeight="medium"
          >
            {signupContent.title}
          </Heading>
          <Text fontSize={"lg"} textAlign={"center"} color={"font.muted2"}>
            {signupContent.description}
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
            {/* ------------------------------- Radio Card ------------------------------- */}

            <FormControl>
              <Center>
                <Controller
                  name="type"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <HStack {...group} spacing={0} onChange={onChange}>
                      {userTypes.map((value, index) => {
                        const radio = getRadioProps({ value });
                        return (
                          <RadioCard key={value} {...radio} index={index}>
                            {value}
                          </RadioCard>
                        );
                      })}
                    </HStack>
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

          <DevTool control={control} />
        </>

        <Flex
          gap={"12"}
          alignItems={"baseline"}
          justifyContent={"center"}
          justifySelf={"flex-end"}
        >
          <Text fontSize={"lg"} color={"font.muted2"}>
            Already have an account?
          </Text>
          <Link
            href={"/login"}
            fontSize={"xl"}
            fontWeight={"medium"}
            color={"font.primary"}
          >
            Login
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
