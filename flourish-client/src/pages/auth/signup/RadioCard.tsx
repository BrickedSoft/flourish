import { useEffect, useState } from "react";
import { Box, useRadio, keyframes, Text } from "@chakra-ui/react";

const RadioCard = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const [isAnimation, setIsAnimation] = useState(false);
  const [bg, setBg] = useState(isAnimation ? "bg.tints.5" : "primary.500");

  useEffect(() => {
    setTimeout(() => {
      setBg("primary.500");
    }, 500);
  }, []);

  const input = getInputProps();
  const checkbox = getRadioProps();

  const slide = keyframes`
    0% {
      transform: translateX(${props.index === 1 && "-"}100%);
      background-color: #1b77cb;
      border-radius: 0;
      border-top-left-radius: ${props.index === 1 && "11px"};
      border-bottom-left-radius: ${props.index === 1 && "11px"};
      border-top-right-radius: ${props.index === 0 && "11px"};
      border-bottom-right-radius: ${props.index === 0 && "11px"};
    }

    25% {
      border-top-left-radius: ${props.index === 1 && "0"};
      border-bottom-left-radius: ${props.index === 1 && "0"};
      border-top-right-radius: ${props.index === 0 && "0"};
      border-bottom-right-radius: ${props.index === 0 && "0"};
    }

    100% { background-color: #1b77cb; }
  `;
  const animationSlid = `${slide} .5s ease-in-out`;

  return (
    <Box as="label">
      <input type="radio" {...input} />
      <Box
        {...checkbox}
        position={"relative"}
        cursor="pointer"
        px={16}
        py={"0.6rem"}
        borderLeftRadius={`${props.index === 0 && "xl"} `}
        borderRightRadius={`${props.index === 1 && "xl"} `}
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
          bg: bg,
          transform: "translateZ(-1px)",
          borderLeftRadius: `${props.index === 0 && "xl"} `,
          borderRightRadius: `${props.index === 1 && "xl"} `,
          display: `${props.isChecked ? "block" : "none"}`,
          animation: `${isAnimation && animationSlid}`,
        }}
        onClick={() => setIsAnimation(true)}
      >
        <Text
          position={"relative"}
          zIndex={100}
          fontSize={"lg"}
          fontWeight={"medium"}
          userSelect={"none"}
        >
          {props.children}
        </Text>
      </Box>
    </Box>
  );
};

export default RadioCard;
