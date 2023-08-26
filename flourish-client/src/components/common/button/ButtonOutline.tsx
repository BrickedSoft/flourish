import { MouseEvent, ReactNode } from "react";
import { Button } from "@chakra-ui/react";

const ButtonOutline = ({
  children,
  px,
  py,
  fontWeight,
  fontSize,
  isLoading,
  bg,
  borderColor,
  onClick,
  ...rest
}: {
  children: ReactNode;
  px?: string;
  py?: string;
  fontWeight?: string;
  fontSize?: string;
  isLoading?: boolean;
  bg?: string;
  borderColor?: string;
  onClick: (e: MouseEvent) => void;
}) => {
  return (
    <Button
      onClick={onClick}
      isLoading={isLoading}
      colorScheme="none"
      variant="none"
      textDecoration="none"
      fontSize={fontSize ?? "18"}
      fontWeight={fontWeight ?? "medium"}
      px={px}
      py={py}
      color="font.hero"
      border="none"
      borderRadius="xl"
      bg={bg ?? "bg"}
      boxShadow={`inset 0 0 0 0.25rem ${borderColor ?? "#fff"}`}
      transition="all 0.3s"
      _hover={{
        bg: "bgContainer",
        boxShadow: "inset 0 0 0 0.25rem #fff",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonOutline;
