import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";

import { Button, Typography } from "@material-ui/core";

import { formatNumber } from "../../helpers/number";

import { CartContext } from "../../providers/cart/cart.provider";

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

export default function Cart() {
  const classes = useStyles();
  const history = useHistory();
  const { cartItems, toggleHidden, cartItemsCount } = useContext(CartContext);
  const handleCheckout = () => {
    toggleHidden();
    history.push("/checkout");
  };
  console.log(cartItems);
  return (
    <List className={classes.root}>
      <ListItem key={1}>
        <Typography variant="h5">Ur Cart</Typography>
      </ListItem>
      {cartItemsCount ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id}>
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <div
                    className={classes.image}
                    style={{
                      backgroundImage: `url(${item.imgs})`,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  className={classes.text}
                  classes={{ primary: classes.name }}
                  primary={item.name}
                  secondary={`x ${item.quantity}`}
                />
                {formatNumber(item.price)}
              </ListItem>
              <Divider variant="middle" component="li" />
            </div>
          ))}

          <ListItem key={3}>
            <Button
              className={classes.btnCheckOut}
              fullWidth
              variant="contained"
              onClick={handleCheckout}
            >
              checkout
            </Button>
          </ListItem>
        </>
      ) : (
        <Typography>Ur cart is empry</Typography>
      )}
    </List>
  );
}
