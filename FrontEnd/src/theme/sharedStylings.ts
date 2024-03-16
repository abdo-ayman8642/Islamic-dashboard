import { muiTypography } from "./base";

// shared Styling
export const CustomTypography = {
  fontFamily: muiTypography.fontFamily,
  h1: muiTypography.h1,
  h2: muiTypography.h2,
  h3: muiTypography.h3,
  h4: muiTypography.h4,
  h5: muiTypography.h5,
  h6: muiTypography.h6,
  subtitle1: muiTypography.subtitle1,
  subtitle2: muiTypography.subtitle2,
  body1: muiTypography.body1,
  body2: muiTypography.body2,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  button: { ...muiTypography.button },
  caption: { ...muiTypography.caption },
  overline: { ...muiTypography.overline },
};

// shared Colors

// shared Light styling
export const CustomLightPalette = {
  primary: {
    main: "#6366F1",
    light: "#41a9a5",
    dark: "#1C2536",
  },
  secondary: {
    main: "#0072AF",
    light: "#368c9d",
    dark: "#024e5d",
  },
  text: {
    primary: "#232323",
    secondary: "#717171",
  },
  background: {
    paper: "#FFFFFF",
    default: "#F9FAFC",
  },
};

// shared Dark styling
export const CustomDarkPalette = {
  primary: {
    light: "#41a9a5",
    main: "#12948f",
    dark: "#0c6764",
  },
  secondary: {
    light: "#368c9d",
    main: "#047085",
    dark: "#024e5d",
  },
  text: {
    primary: "#1c164a",
    secondary: "#d3d1df",
  },
  background: {
    paper: "#fff",
    default: "#f3f3f3",
  },
};