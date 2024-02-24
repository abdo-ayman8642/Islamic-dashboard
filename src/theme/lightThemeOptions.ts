import { createTheme } from "@mui/material/styles";
import { breakpoints, globals } from "./base";
import { CustomLightPalette, CustomTypography } from "./sharedStylings";

// Light theme
const lightThemeOptions = createTheme({
  direction: "ltr",
  breakpoints: { ...breakpoints },
  palette: { mode: "light", ...CustomLightPalette },
  typography: { ...CustomTypography },
  components: {
    MuiCssBaseline: {
      styleOverrides: { ...globals },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
        containedPrimary: {
          color: "#FFFFFF",
          borderRadius: 100,
        }
      }
    },
  },
});

export default lightThemeOptions;
