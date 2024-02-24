import { createTheme } from "@mui/material/styles";
import { breakpoints, globals } from "./base";
import { CustomDarkPalette, CustomTypography } from "./sharedStylings";

// dark theme
const darkThemeOptions = createTheme({
  direction: "ltr",
  breakpoints: { ...breakpoints },
  palette: { mode: "dark", ...CustomDarkPalette },
  typography: { ...CustomTypography },
  components: {
    MuiCssBaseline: {
      styleOverrides: { ...globals },
    },
  },
});

export default darkThemeOptions;
