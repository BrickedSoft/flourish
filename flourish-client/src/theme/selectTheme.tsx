import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const xl = defineStyle({
  fontSize: "xl",
  px: 16,
  h: "3.92rem",
  borderRadius: "xl",
  _placeholder: {
    color: "font.muted2",
  },
});

const sizes = {
  xl: definePartsStyle({ field: xl, icon: { ...xl, w: "auto", h: 36 } }),
};

export const selectTheme = defineMultiStyleConfig({ sizes });
