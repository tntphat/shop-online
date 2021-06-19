import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
  },
  breadCrumbs: {
    margin: "30px 0",
  },
  title: {
    bold: true,
    margin: "20px 0",
  },
  price: {
    color: "#C10017",
    marginTop: 20,
    marginBottom: 20,
  },
  img: {
    display: "block",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "300px",

    backgroundCover: "auto",
  },
  quantity: {
    height: "100%",
    // alignContent: "center",
    textAlign: "center",
    margin: "auto 8px",
  },
  btnAdd: {
    marginTop: "auto",
  },
  divider: {
    marginTop: "8px",
    marginBottom: "8px",
  },
}));

export default useStyles;
