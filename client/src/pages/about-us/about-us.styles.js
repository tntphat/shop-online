import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: "60px ",
    minHeight: "100vh",
  },
  image: {
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",
    // width: "100%",
    // height: "80%",
    // backgroundCover: "auto",
    backgroundImage:
      "url('https://www.ctdb.hcmus.edu.vn/wp-content/uploads/2015/07/logo-khtn.png')",
    height: "80vh",
    backgroundSize: "100% 100%",
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  accor: {
    marginBottom: theme.spacing(2),
  },

  heading: {
    fontWeight: "500",
  },
  contact: {
    cursor: "pointer",
    "&:hover": {
      opacity: ".8",
    },
  },

  icon: {
    marginRight: theme.spacing(1),
  },
  infor: {
    textAlign: "center",
  },
  //   table: {
  //     marginTop: "20px",
  //     backgroundColor: theme.palette.table.main,
  //     minWidth: "100%",
  //   },
  //   label: {
  //     margin: "15px 0 0 15px",
  //   },
  //   image: {
  //     width: "100%",
  //     height: "106px",
  //     backgroundSize: "cover",
  //     backgroundPosition: "center",
  //   },
  //   nameItem: {
  //     width: "160px",
  //   },
  //   quantity: {
  //     display: "inline-block",
  //     margin: "auto 0",
  //   },
  //   total: {
  //     textAlign: "right",
  //     fontSize: "1.25rem",
  //     fontWeight: "300",
  //   },
}));

export default useStyles;
