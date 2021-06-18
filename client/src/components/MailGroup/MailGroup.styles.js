import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxHeight: "82vh",
    padding: theme.spacing(1),
  },
  cardMail: {
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(1),
    },
    maxHeight: "100%",
    width: "100%",
  },
}));

export default useStyles;
