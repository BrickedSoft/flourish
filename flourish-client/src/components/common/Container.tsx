import { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type PropsType = {
  children: ReactNode;
  id?: string | undefined | number;
  w?: string | number;
  maxW?: string | number;
  px?: string | number;
  bg?: string;
  [key: string]: string | number | undefined | ReactNode;
};

const Container: FC<PropsType> = ({
  children,
  id,
  w = "full",
  maxW = "full",
  px = 20,
  bg = "white",
  ...props
}) => {
  return (
    <Box w={w} maxW={maxW} px={px} mx={"auto"} bg={bg} {...props}>
      {children}
    </Box>
  );
};

export default Container;
