import { createMuiTheme } from "@material-ui/core/styles";

const commonTheme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 740,
      md: 1023,
      lg: 1113,
      xl: 1920,
    },
  },
};

const darkTheme = createMuiTheme({
  ...commonTheme,
  palette: {
    type: "dark",
    navBar: {
      main: "#2d3436",
    },
    poster: {
      poster1: "#2ed573",
      poster2: "#b33939",
      indicator: "#a4b0be",
      indicatorHover: "#747d8c",
      indicatorActive: "#57606f",
      poster3: "#cd6133",
    },
    text: {
      main: "#f1f2f6",
    },
    table: {
      main: "#2d3436",
    },
  },
});

const lightTheme = createMuiTheme({
  ...commonTheme,
  palette: {
    type: "light",
    navBar: {
      main: "#f1f2f6",
    },
    poster: {
      poster1: "#7bed9f",

      poster2: "#ff5252",
      poster3: "#ff793f",
      indicator: "#747d8c",
      indicatorHover: "#a4b0be",
      indicatorActive: "#2f3542",
    },
    text: {
      main: "#2d3436",
    },
    table: {
      main: "#f1f2f6",
    },
  },
});

export { darkTheme, lightTheme };
