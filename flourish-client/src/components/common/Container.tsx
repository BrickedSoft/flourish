import React from "react";
import { Box } from "@chakra-ui/react";

const Container = ({
  id,
  children,
  bg = "bg",
  pt = "0",
  px = "32",
  w = "full",
  maxW = "full",
}: {
  id?: string;
  children: React.ReactNode;
  bg?: string;
  pt?: string;
  px?: string;
  w?: string;
  maxW?: string;
}) => {
  return (
    <Box id={id ?? ""} maxW={maxW} w={w} mx={"auto"} px={px} pt={pt} bg={bg}>
      {children}
    </Box>
  );
};

export default Container;
