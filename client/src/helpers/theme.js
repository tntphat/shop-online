import { createMuiTheme } from "@material-ui/core/styles";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    navBar: {
      main: "#2d3436",
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
  palette: {
    type: "light",
    navBar: {
      main: "#f1f2f6",
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
