import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "60px 0",
    minHeight: "100vh",
  },
  table: {
    marginTop: "20px",
    backgroundColor: theme.palette.table.main,
    minWidth: "100%",
  },
  label: {
    margin: "15px 0 0 15px",
  },
  image: {
    width: "100%",
    height: "106px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  nameItem: {
    width: "160px",
  },
  quantity: {
    display: "inline-block",
    margin: "auto 0",
  },
  total: {
    textAlign: "right",
    fontSize: "1.25rem",
    fontWeight: "300",
  },
}));

export default useStyles;
