import { MouseEvent, ReactNode } from "react";
import { Button } from "@chakra-ui/react";

const ButtonFull = (props: any) => {
  const {
    children,
    px,
    py,
    bg,
    fontSize,
    fontWeight,
    color,
    bgHover,
    borderRadius,
    isLoading,
    onClick,
    ...rest
  }: {
    children: ReactNode;
    px?: string;
    py?: string;
    bg?: string;
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    bgHover?: string;
    borderRadius?: string;
    isLoading?: boolean;
    onClick: (e: MouseEvent) => void;
  } = props;

  return (
    <Button
      onClick={onClick}
      colorScheme="none"
      isLoading={isLoading}
      variant="none"
      textDecoration="none"
      fontSize={fontSize ?? "18"}
      fontWeight={fontWeight ?? "medium"}
      px={px}
      py={py}
      color={color ?? "#fff"}
      border="none"
      borderRadius={`${borderRadius ?? "xl"}`}
      transition="all 0.3s"
      bg={bg ?? "primary.400"}
      _hover={{
        color: "#fff",
        bg: `${bgHover ?? "primary.500"}`,
        boxShadow: `inset 0 0 0 0.25rem rgba(28, 126, 214, 0.25),  0 0.8rem 1.6rem rgba(28, 126, 214, 0.5)`,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonFull;
