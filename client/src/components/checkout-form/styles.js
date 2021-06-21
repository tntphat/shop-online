import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  card: {
    border: "1px solid black",
    // padding: "40px",
    borderRadius: "8px",
  },
  stripeElement: {
    padding: "12px",
    borderRadius: "8px 8px 0 0",
    width: "34vw",
    background: "white",
    color: theme.palette.navBar.main,
  },
  inputField: {
    marginTop: "20px",
  },
  nameProduct: {
    wordWrap: "break-word",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 1,
    overflow: "hidden",
  },
  row: {
    width: "70%",
    // marginBottom: "10px",
  },
}));

export default useStyles;
