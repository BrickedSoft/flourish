import { FC } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { GetFilledQuestionnaireTypes } from "../../../../types/Questionnaire";
import { stringToDate } from "../../../../utils/date";

type GetFilledQuestionnaireTypesExtended = GetFilledQuestionnaireTypes & {
  name: string;
};

type PropsType = {
  data: GetFilledQuestionnaireTypesExtended;
};

const FilledQuestionnaireCard: FC<PropsType> = ({ data }) => {
  return (
    <Card
      as={Link}
      w={"full"}
      px={24}
      py={16}
      border={"2px solid #e9f2fd"}
      borderRadius={"xl"}
      boxShadow={"none"}
      to={data.id}
      transition={"all 0.15s ease-in-out"}
      _hover={{
        borderColor: "primary.200",
      }}
    >
      <CardHeader>
        <Flex gap={16} justifyContent={"space-between"} alignItems={"center"}>
          <Heading
            size="xl"
            color={"font.general"}
            fontWeight={"semibold"}
            textTransform={"capitalize"}
            letterSpacing={"tight"}
          >
            {data.name}
          </Heading>
        </Flex>
        <Text fontSize={"md"} fontWeight={"medium"} color={"font.muted"}>
          {stringToDate(data.created_at)}
        </Text>
      </CardHeader>

      <CardBody as={VStack} spacing={4} alignItems={"start"} fontSize={"xl"}>
        <Text>
          Score:{" "}
          <Text as={"span"} fontWeight={"semibold"} color={"font.heroLight"}>
            {data.comment.points}
          </Text>
        </Text>
        <Text>
          Severity:{" "}
          <Text as={"span"} fontWeight={"semibold"} color={"font.heroLight"}>
            {data.comment.name}
          </Text>
        </Text>
      </CardBody>
    </Card>
  );
};

export default FilledQuestionnaireCard;
