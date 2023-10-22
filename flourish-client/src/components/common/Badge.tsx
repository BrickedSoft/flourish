import { FC, ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type PropsType = {
  children: ReactNode;
  colorScheme: string;
  color?: string;
};

const Badge: FC<PropsType> = ({ children, colorScheme, color }) => {
  return (
    <Flex
      bg={colorScheme}
      py={4}
      px={8}
      borderRadius={"full"}
      fontSize={"md"}
      color={color ?? "white"}
      textTransform={"uppercase"}
      alignItems={"center"}
      justifyContent={"center"}
      fontWeight={"medium"}
    >
      {children}
    </Flex>
  );
};

export default Badge;
