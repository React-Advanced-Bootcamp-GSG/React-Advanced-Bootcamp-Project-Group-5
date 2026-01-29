import { createTheme, type MantineColorsTuple } from "@mantine/core";

// This is a custom swatch based on your color #667eea
const gradColor: MantineColorsTuple = [
  "#e0e7ff",
  "#c7d2fe",
  "#a5b4fc",
  "#818cf8",
  "#667eea", // Primary Shade (Index 5)
  "#4f46e5",
  "#4338ca",
  "#3730a3",
  "#312e81",
];

export const theme = createTheme({
  colors: {
    gradColor,
  },
  primaryColor: "gradColor",
  primaryShade: 5,

  defaultGradient: {
    from: "#667eea",
    to: "#764ba2",
    deg: 135,
  },
});
