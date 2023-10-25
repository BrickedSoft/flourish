import { FC } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Badge from "../common/Badge";
import { RegistrationFormTypes } from "../../types/RegistrationForm";
import { stringToDate } from "../../utils/date";

type PropsType = {
  data: RegistrationFormTypes;
};

const RegistrationFormCard: FC<PropsType> = ({ data }) => {
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
            {data.type_of_service}
          </Heading>
          <Badge colorScheme={`status.${data.session_status}`}>
            {data.session_status}
          </Badge>
        </Flex>
        <Text fontSize={"md"} fontWeight={"medium"} color={"font.muted"}>
          {stringToDate(data.created_at)}
        </Text>
      </CardHeader>

      {(data.official_comment ||
        (data.session_time && data.session_location)) && (
        <CardBody as={Flex} flexDir={"column"} gap={2}>
          {data.official_comment && (
            <Text
              textTransform={"capitalize"}
              fontSize={"lg"}
              color={"font.muted"}
            >
              {data.official_comment}
            </Text>
          )}

          {data.session_time && data.session_location && (
            <Text fontSize={"lg"}>
              Counselling{" "}
              <Text as={"span"} fontWeight={"500"} color={"font.focused"}>
                {stringToDate(data.session_time)}
              </Text>{" "}
              at{" "}
              <Text as={"span"} fontWeight={"500"} color={"font."}>
                {data.session_location}
              </Text>
            </Text>
          )}
        </CardBody>
      )}
    </Card>
  );
};

export default RegistrationFormCard;
