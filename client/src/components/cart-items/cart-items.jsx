import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@material-ui/core";

import { formatNumber } from "../../helpers/number";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { addProductSuccess } from "../../redux/product/product.actions";

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

const CartItems = ({
  cartItems,
  handleChangeStatusInvoice,
  customer,
  address,
  isAdmin,
  title,
  isCart,
  handleCheckout,
  total,
  status,
}) => {
  const classes = useStyles();
  return (
    <List className={!isCart && classes.sect}>
      <ListItem key={1}>
        {isCart ? (
          <Typography variant="h5">{title}</Typography>
        ) : (
          <Box
            display="flex"
            style={{ width: "100%" }}
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography variant="h6">#{title}</Typography>

            <Typography variant="h6">{status}</Typography>
          </Box>
        )}
      </ListItem>
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
          <Divider light variant="middle" />
        </div>
      ))}
      {isCart ? (
        <ListItem key={-1}>
          <Button
            className={classes.btnCheckOut}
            fullWidth
            variant="contained"
            onClick={handleCheckout}
          >
            checkout
          </Button>
        </ListItem>
      ) : (
        <>
          <ListItem>
            {isAdmin ? (
              <ListItemText
                style={{ width: "100%" }}
                className={classes.text}
                classes={{ primary: classes.name }}
                primary={`${customer.firstName} ${customer.lastName}`}
                secondary={address}
              />
            ) : undefined}
            <Typography variant="h6" style={{ width: "100%" }} align="right">
              {`Total: ${formatNumber(total)} Đ`}
            </Typography>
          </ListItem>
        </>
      )}

      {status !== "Delivered" ? (
        <ListItem>
          <Button
            variant="contained"
            onClick={() =>
              handleChangeStatusInvoice(
                title,
                (!isAdmin && "Cancelled") ||
                  (status === "Pending" && "Accepted") ||
                  (status === "Accepted" && "Delivering") ||
                  (status === "Delivering" && "Delivered")
              )
            }
          >
            {(!isAdmin && "Cancel") ||
              (status === "Pending" && "Accept") ||
              (status === "Accepted" && "Deliver") ||
              (status === "Delivering" && "Delivered")}
          </Button>
        </ListItem>
      ) : undefined}
    </List>
  );
};

export default CartItems;
