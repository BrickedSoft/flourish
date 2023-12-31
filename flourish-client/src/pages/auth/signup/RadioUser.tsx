import { Box, Text, keyframes, useRadio } from "@chakra-ui/react";
import { useState } from "react";
import { userTypes } from "../../../types/User";

const RadioUser = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const [prevState, setPrevState] = useState<number>(props.prevState);

  const totalUserTypes = Object.keys(userTypes).length;
  const index = Object.keys(userTypes).indexOf(props.children);
  const input = getInputProps();
  const checkbox = getRadioProps();

  const slide = keyframes`
    0% {
      transform: translateX(${(prevState - index) * 100}%);
      background-color: #1b77cb;
      border-radius: 0;
    }

    25% {
      border-top-left-radius: ${index === totalUserTypes - 1 && "0"};
      border-bottom-left-radius: ${index === totalUserTypes - 1 && "0"};
      border-top-right-radius: ${index === 0 && "0"};
      border-bottom-right-radius: ${index === 0 && "0"};
    }

    100% { background-color: #1b77cb; }
  `;

  const animationSlide = `${slide} .5s ease-in-out`;

  return (
    <Box as="label">
      <input type="radio" {...input} />
      <Box
        {...checkbox}
        position={"relative"}
        cursor="pointer"
        px={12}
        py={"0.6rem"}
        borderLeftRadius={`${index === 0 && "xl"} `}
        borderRightRadius={`${index === totalUserTypes - 1 && "xl"} `}
        bg={"bg.tints.5"}
        transition={"all 0.5s ease-in-out"}
        _checked={{
          color: "white",
        }}
        _focus={{
          boxShadow: "none",
        }}
        _after={{
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "full",
          height: "full",
          zIndex: "docked",
          bg: "primary.500",
          transform: "translateZ(-1px)",
          borderLeftRadius: `${index === 0 && "xl"} `,
          borderRightRadius: `${index === totalUserTypes - 1 && "xl"} `,
          display: `${props.isChecked ? "block" : "none"}`,
          animation: `${animationSlide}`,
        }}
        onClick={() => {
          setPrevState(props.prevState);
        }}
      >
        <Text
          position={"relative"}
          zIndex={100}
          fontSize={"lg"}
          fontWeight={"medium"}
          userSelect={"none"}
          textAlign={"center"}
          textTransform={"lowercase"}
          letterSpacing={"wide"}
          _firstLetter={{
            textTransform: "uppercase",
          }}
        >
          {props.children}
        </Text>
      </Box>
    </Box>
  );
};

export default RadioUser;
