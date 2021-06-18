import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `20px 0`,
  },
  title: {
    margin: `10px 8px`,
    position: "relative",
    cursor: "pointer",
    fontWeight: "300",
    "&:hover": {
      // color: theme.palette.table.main,
      // textDecoration: "underlined",
      opacity: ".6",
    },
    "&::before": {
      content: "''",
      position: "absolute",
      width: "4px",
      height: "100%",
      backgroundColor: "#636e72",
      left: "-8px",
    },
  },
}));

export default useStyles;
