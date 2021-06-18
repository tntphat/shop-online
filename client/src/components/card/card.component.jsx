import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";

import { CartContext } from "../../providers/cart/cart.provider";

import { formatNumber } from "../../helpers/number";
import useStyles from "./card.styles";

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
        <Box my={1} display="flex" flexDirection="row">
          <Rating value={product.star} precision={0.5} readOnly />
          <Box ml={1}>
            <Typography component="span" variant="body2">
              ({product.rates.length})
            </Typography>
          </Box>
        </Box>

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
