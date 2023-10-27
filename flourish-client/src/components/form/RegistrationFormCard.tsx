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
import { stringToDate, stringToTime } from "../../utils/date";

type PropsType = {
  data: RegistrationFormTypes;
  route?: string;
};

const RegistrationFormCard: FC<PropsType> = ({ data, route }) => {
  return (
    <Card
      as={Link}
      w={"full"}
      px={24}
      py={16}
      border={"2px solid #e9f2fd"}
      borderRadius={"xl"}
      boxShadow={"none"}
      to={route ? `${route}/${data.id}` : data.id}
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
            <Text textTransform={"capitalize"} fontSize={"lg"}>
              {data.official_comment}
            </Text>
          )}

          {data.session_time && data.session_location && (
            <Text fontSize={"lg"}>
              Counselling at{" "}
              <Text as={"span"} fontWeight={"500"} color={"font.heroLight"}>
                {stringToDate(data.session_time)}
              </Text>
              {", "}
              <Text as={"span"} fontWeight={"500"} color={"font.heroLight"}>
                {stringToTime(data.session_time)}
              </Text>{" "}
              in{" "}
              <Text as={"span"} fontWeight={"500"} color={"font.heroLight"}>
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
