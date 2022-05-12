import { createTheme } from "@mui/material/styles";

// Used for Material UI component color
export const theme = createTheme({
  palette: {
    primary: {
      main: "#68A7AD",
      light: "#76c0c7",
      dark: "#2d3436",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#99C4C8",
      light: "#a1c5c9",
      dark: "#8ab8bd",
    },
    tertiary: {
      main: "#edc37b",
      light: "#e7d2ac",
      dark: "#e2ab4d",
    },
    quaternary: {
      main: "#EEE4AB",
      light: "#eee5b8",
      dark: "#dbcd7c",
    },
    quinary: {
      main: "#F55353",
    },
    otherColor: {
      main: "#FFFFFF",
      dark: "#012530",
    },
  },
  typography: {
    fontFamily: `'Nunito',sans-serif`,
	fontWeightLight: 600,
    fontWeightRegular: 600,
    fontWeightMedium: 600,
  },
});
