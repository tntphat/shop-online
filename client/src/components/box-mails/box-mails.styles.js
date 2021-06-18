import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    width: "36ch",
    minWidth: "36ch",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      minWidth: "24ch",
    },
  },
  inline: {
    display: "inline",
  },
  description: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: "2",
    overflow: "hidden",
  },
  title: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: "1",
    overflow: "hidden",
  },
  active: {
    backgroundColor: "#84817a",
  },
  repped: {
    backgroundColor: "#3867d6",
  },
}));

export default useStyles;
