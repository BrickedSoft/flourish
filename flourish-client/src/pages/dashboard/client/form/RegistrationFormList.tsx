import { useEffect } from "react";
import { Button, Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import {
  formData,
  formList as formListData,
} from "../../../../assets/data/dashboard/registrationForm";
import { routes } from "../../../../assets/data/routes";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import { fetchRegistrationForm } from "../../../../store/actions/formActions";
import RegistrationFormCard from "./RegistrationFormCard";

const RegistrationFormList = () => {
  const dispatch = useAppDispatch();
  const fromList = useAppSelector((state) => state.registrationForm.forms);

  useEffect(() => {
    dispatch(fetchRegistrationForm());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttonFull = (
    <Button
      as={Link}
      px={"16"}
      py={"20"}
      fontSize={"lg"}
      alignSelf={"center"}
      colorScheme={"green"}
      borderRadius={"xl"}
      to={routes.fillRegistrationForm}
    >
      <Flex gap={8} alignItems={"center"}>
        <Text as={"span"} fontSize={20}>
          {formData.button.add.icon}
        </Text>
        {formData.button.add.title}
      </Flex>
    </Button>
  );

  const buttonAdd = (
    <Button
      as={Link}
      boxSize={"48px"}
      fontSize={32}
      borderRadius={"full"}
      alignSelf={"center"}
      variant={"solid"}
      colorScheme="green"
      to={routes.fillRegistrationForm}
      boxShadow={"0px 12px 24px rgba(0, 0, 0, 0.25)"}
      transition={"all 0.3s ease-in-out"}
    >
      {formData.button.add.icon}
    </Button>
  );

  return (
    <VStack w={"full"} h={"full"} spacing={24} alignItems={"stretch"} pb={32}>
      {fromList.map((data, index) => (
        <RegistrationFormCard key={index} data={data} />
      ))}

      {fromList.length === 0 ? (
        <VStack as={Center} h={"full"} spacing={24}>
          <Heading
            fontSize={"5xl"}
            fontWeight={"semibold"}
            color={"font.muted3"}
            letterSpacing={"tight"}
          >
            {formListData.empty.title}
          </Heading>
          {buttonFull}
        </VStack>
      ) : (
        <Center position={"sticky"} bottom={0} left={"50%"}>
          {buttonAdd}
        </Center>
      )}
    </VStack>
  );
};

export default RegistrationFormList;
