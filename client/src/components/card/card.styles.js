import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
    "&:hover": {
      "& $img": {
        opacity: "0.7",
        transform: "scale(1.3)",
      },
    },
  },
  bullet: {
    display: "inline-block",
    // margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  containImg: {
    overflow: "hidden",
    width: "100%",
  },
  img: {
    transition: "transform .5s cubic-bezier(0.25, 0.45, 0.45, 0.95)",
    display: "block",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "150px",
    backgroundCover: "auto",
  },
  name: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: "1",
    overflow: "hidden",
  },
  cardContent: {
    padding: `4px 16px `,
  },
  btnAdd: {
    "&:hover": {
      background: "#636e72",
      color: "#fff",
    },
  },
}));

export default useStyles;
