import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
    right: "80px",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    zIndex: 5,
    border: "1px solid #636e72",
  },
  name: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: "1",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  text: {
    margin: "0 6px",
  },
  btnCheckOut: {
    margin: "0 40px",
  },
}));

export default useStyles;
