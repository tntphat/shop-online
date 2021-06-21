import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    background: "red",
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: theme.palette.text.main,
  },
  navBar: {
    background: "transparent",
    color: theme.palette.text.main,
    marginTop: "40px",
    transition: "margin 700ms",
    position: "fixed",
    width: "100%",
    boxShadow: "0 0 0",
    zIndex: 3,
  },
  navBar2: {
    opacity: 0.9,
    boxShadow:
      "0 1px 5px -1px rgb(51 62 73 / 14%), 0 4px 10px 0 rgb(51 62 73 / 8%)",
    background: theme.palette.navBar.main,
    marginTop: "0px",
  },
  btn: {
    background: "red",
    color: theme.palette.text.main,
  },
  link: {
    margin: "auto 20px",
    textDecoration: "none",
    color: theme.palette.text.main,
    fontWeight: "400",
  },
  vl: {
    height: "30vh",
    backgroundColor: "red",
    position: "absolute",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    cursor: "default",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    with: "100%",
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "0",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default useStyles;
