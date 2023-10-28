import { FC, ReactNode } from "react";
import { Text, chakra } from "@chakra-ui/react";

import { HeadingVariant } from "../../types/Enums";

type PropsType = {
  children: ReactNode;
  variant: HeadingVariant;
  [key: string]: string | number | undefined | ReactNode;
};

const CustomHeading: FC<PropsType> = ({ children, variant, ...rest }) => {
  const primaryVariant = {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: "lg",
    fontWeight: "medium",
    color: "font.heroLight",
    mb: 16,
  };

  const secondaryVariant = {
    textTransform: "capitalize",
    textAlign: "center",
    color: "font.hero",
    fontSize: "7xl",
    fontWeight: "bold",
    lineHeight: "1.2",
    mb: 36,
  };

  const CustomText = chakra(Text, {
    baseStyle: {
      ...(variant === HeadingVariant.primary
        ? primaryVariant
        : secondaryVariant),
    },
  });

  return <CustomText {...rest}>{children}</CustomText>;
};

export default CustomHeading;
