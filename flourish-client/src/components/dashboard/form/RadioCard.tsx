import { useState } from "react";
import { Box, Text, keyframes, useRadio } from "@chakra-ui/react";

const RadioCard = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const [prevState, setPrevState] = useState<number>(props.prevState);

  const index = props.index;
  const input = getInputProps();
  const checkbox = getRadioProps();

  const slide = keyframes`
        0% {
          transform: translateX(calc(${(prevState - index) * 100}%
          + ${(prevState - index) * 36}px ));
          background-color: #1b77cb;
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
        borderRadius={"xl"}
        transition={"all 0.5s ease-in-out"}
        color={"font.muted2"}
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
          borderRadius: "xl",
          transform: "translateZ(-1px)",
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
          fontSize={"xl"}
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

export default RadioCard;
