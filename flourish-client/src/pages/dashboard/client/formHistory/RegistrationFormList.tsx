import { Button, Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import {
  formData,
  formList as formListData,
} from "../../../../assets/data/dashboard/registrationForm";
import { routes } from "../../../../assets/data/routes";
import RegistrationFormCard from "../../../../components/form/RegistrationFormCard";
import { useAppSelector } from "../../../../hooks/useStore";

const RegistrationFormList = () => {
  const fromList = useAppSelector((state) => state.registrationForm.forms);

  const buttonFull = (
    <Button
      as={Link}
      px={"16"}
      py={"20"}
      fontSize={"lg"}
      alignSelf={"center"}
      colorScheme={"green"}
      borderRadius={"xl"}
      to={routes.form}
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
      to={routes.form}
      boxShadow={"0px 12px 24px rgba(0, 0, 0, 0.25)"}
      transition={"all 0.3s ease-in-out"}
    >
      {formData.button.add.icon}
    </Button>
  );

  return (
    <VStack w={"full"} h={"full"} py={32} spacing={24} alignItems={"stretch"}>
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
        <Center
          position={"sticky"}
          bottom={0}
          left={"50%"}
          transform={"translateY(-50%)"}
        >
          {buttonAdd}
        </Center>
      )}
    </VStack>
  );
};

export default RegistrationFormList;
