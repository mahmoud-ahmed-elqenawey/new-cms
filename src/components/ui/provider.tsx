"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  LocaleProvider,
} from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { ColorModeProvider } from "./color-mode";

const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      colorPalette: "teal",
    },
  },
  theme: {
    tokens: {
      fonts: {
        body: { value: "var(--font-rubik)" },
        heading: { value: "var(--font-rubik)" },
        mono: { value: "var(--font-rubik)" },
      },
    },
    semanticTokens: {
      radii: {
        l1: { value: "0.75rem" },
        l2: { value: "1rem" },
        l3: { value: "1.5rem" },
      },
    },
  },
});

export const Provider = (props: PropsWithChildren) => (
  <ChakraProvider value={system}>
    <LocaleProvider locale="ar-AR">
      <ColorModeProvider forcedTheme="light">
        {props.children}
      </ColorModeProvider>
    </LocaleProvider>
  </ChakraProvider>
);
