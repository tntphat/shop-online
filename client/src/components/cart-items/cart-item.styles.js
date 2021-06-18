import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  sect: {
    // backgroundColor: "red",
    border: `1px solid ${theme.palette.text.main}`,
    marginBottom: "20px",
    borderRadius: "10px",
    // padding: "0",
  },
}));

export default useStyles;
