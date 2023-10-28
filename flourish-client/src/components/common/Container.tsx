import { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type PropsType = {
  children: ReactNode;
  id?: string | undefined | number;
  w?: string;
  maxW?: string;
  px?: string;
  bg?: string;
  [key: string]: string | number | undefined | ReactNode;
};

const Container: FC<PropsType> = ({
  children,
  id,
  w = "full",
  maxW = "13xl",
  px = "20px",
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
