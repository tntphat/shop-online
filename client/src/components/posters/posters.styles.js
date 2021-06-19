import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: " 100vw",
  },
  carou: {
    width: "100%",
    height: "100%",
  },
  box: {
    minWidth: "60vw",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: `1px solid ${theme.palette.text.main}`,
    padding: theme.spacing(4),
    borderRadius: theme.spacing(4),
  },
  item: {
    width: "100%",
    height: "100%",
  },
  poster: {
    width: "100vw",
    height: "100vh",
  },
  poster1: {
    backgroundColor: theme.palette.poster.poster1,
  },
  poster2: {
    backgroundColor: theme.palette.poster.poster2,
  },
  poster3: {
    backgroundColor: theme.palette.poster.poster3,
  },
  title: {
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3rem",
    },
  },
  caption: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  btnIndicator: {
    padding: "4px", // 1
    color: theme.palette.poster.indicator,
    "&:hover": {
      color: theme.palette.poster.indicatorHover,
    },
  },
  btnIndicatorActive: {
    color: theme.palette.poster.indicatorActive,
  },
}));

export default useStyles;
