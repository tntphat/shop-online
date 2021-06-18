import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  homeIcon: {
    fontSize: "4rem",
  },
  link: {
    textDecoration: "none",
    display: "block",
    color: theme.palette.text.main,
  },
  active: {
    backgroundColor: "#636e72",
    color: theme.palette.navBar.main,
  },
}));

export default useStyles;
