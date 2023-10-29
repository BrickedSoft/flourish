import { FC, ReactNode } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

type DataType = {
  icon: ReactNode;
  bgColor: string;
  title: string;
  description: string;
};

type PropsType = {
  data: DataType;
  isBoxShadow: boolean;
  alignItems: string;
};

const WidgetServicesWorks: FC<PropsType> = ({
  data,
  alignItems,
  isBoxShadow,
}) => {
  return (
    <Stack
      borderRadius={"2xl"}
      px={isBoxShadow ? "24" : "16"}
      py={isBoxShadow ? "16" : "0"}
      alignItems={alignItems ? alignItems : "start"}
      bg="bg"
      spacing={8}
      boxShadow={isBoxShadow ? "8px 8px 24px rgba(0, 0, 0, 0.08)" : "none"}
    >
      <Box p={12} bg={data.bgColor} borderRadius={"full"}>
        {data.icon}
      </Box>
      <Text
        fontSize={"18"}
        fontWeight="medium"
        color={"font.hero"}
        mb={"12"}
        textTransform="capitalize"
      >
        {data.title}
      </Text>
      <Text
        fontSize={"14"}
        fontWeight="regular"
        color={"font.muted"}
        lineHeight={"tall"}
        textAlign={"justify"}
      >
        {data.description}
      </Text>
    </Stack>
  );
};

export default WidgetServicesWorks;
