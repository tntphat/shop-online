import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { CartContext } from "../../providers/cart/cart.provider";

import { formatNumber } from "../../helpers/number";

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

export default function SimpleCard({ product, setNotify, hideBtn }) {
  const classes = useStyles();
  const history = useHistory();
  const { addItem } = useContext(CartContext);
  const handleAddItem = (e) => {
    e.stopPropagation();
    setNotify({
      isOpen: true,
      message: "Bn đã add to cart",
      type: "success",
    });
    // e.preventDefault();
    addItem(product);
  };
  return (
    // <Link to={`/products/${product._id}`}>
    <Card
      className={classes.root}
      // style={{ cursor: "pointer" }}
      onClick={() => history.push(`/products/${product._id}`)}
      variant="outlined"
    >
      <div className={classes.containImg}>
        <div
          className={classes.img}
          style={{ backgroundImage: `url(${product.imgs})` }}
        />
      </div>
      {/* <CardMedia
        className={classes.img}
        image={product.imgs}
        title="Paella dish"
      /> */}
      <CardContent className={classes.cardContent}>
        <Tooltip title={product.name}>
          <Typography className={classes.name} variant="body1" component="h2">
            {product.name}
          </Typography>
        </Tooltip>
        <Typography className={classes.pos} color="textSecondary">
          {formatNumber(product.price)} VND
        </Typography>
      </CardContent>
      {!hideBtn ? (
        <CardActions>
          <Button
            className={classes.btnAdd}
            onClick={handleAddItem}
            size="small"
            variant="contained"
            fullWidth
          >
            aDD to cart
          </Button>
        </CardActions>
      ) : undefined}
    </Card>
    // </Link>
  );
}
