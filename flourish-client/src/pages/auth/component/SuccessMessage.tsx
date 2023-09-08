import { Heading, Text, VStack } from "@chakra-ui/react";
import { BsCheck2Circle } from "react-icons/bs";

import { successMessage } from "../../../assets/data/auth";

const SuccessMessage = ({
  data: { title, description },
}: {
  data: typeof successMessage.signIn;
}) => {
  return (
    <VStack spacing={16}>
      <BsCheck2Circle size={36} color={"#40c057"} strokeWidth={0.75} />
      <Heading
        fontSize={"4xl"}
        fontWeight={"semibold"}
        color={"success"}
        textAlign={"center"}
      >
        {title}
      </Heading>
      <Text fontSize={"lg"} color={"font.muted2"} textAlign={"center"}>
        {description}
      </Text>
    </VStack>
  );
};

export default SuccessMessage;
