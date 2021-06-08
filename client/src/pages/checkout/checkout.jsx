import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  IconButton,
  isMuiElement,
  Paper,
  Typography,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { CartContext } from "../../providers/cart/cart.provider";
import { formatNumber } from "../../helpers/number";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";

import { addInvoiceStart } from "../../redux/invoice/invoice.actions";

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

const ProductContainer = ({ name }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { cartItems, addItem, removeItem, clearItemFromCart, clearCart } =
    useContext(CartContext);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const totalPrice = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
  const history = useHistory();
  const handlePay = () => {
    const products = [];
    const productsQuantityLeft = [];
    const data = cartItems.forEach(({ quantity, _id, quantity_left }) => {
      products.push({
        quantity,
        product_id: _id,
      });
      productsQuantityLeft.push(quantity_left);
    });
    dispatch(
      addInvoiceStart({
        products,
        total_price: totalPrice,
        productsQuantityLeft,
        clearCart,
        setNotify,
        history,
      })
    );
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item sm={3} />
        <Grid item sm={6}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <Typography variant="h5" className={classes.label}>
                {(name && `Cart's ${name}`) || "Your Cart"}
              </Typography>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.name}>
                  <TableCell component="th" scope="row">
                    <Link to={`products/${item._id}`}>
                      <div
                        className={classes.image}
                        style={{
                          backgroundImage: `url(${item.imgs})`,
                        }}
                      />
                    </Link>
                  </TableCell>
                  <TableCell className={classes.nameItem}>
                    {item.name}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        removeItem(item);
                      }}
                    >
                      <ArrowBackIosOutlinedIcon />
                    </IconButton>
                    {/* <Typography className={classes.quantity}> */}
                    {item.quantity}
                    {/* </Typography> */}
                    <IconButton
                      onClick={() => {
                        addItem(item);
                      }}
                    >
                      <ArrowForwardIosOutlinedIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    {formatNumber(item.price)}
                  </TableCell>
                  <TableCell align="right">
                    <ClearOutlinedIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        clearItemFromCart(item);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() =>
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are u sure to pay?",
                        subTitle: "U cant undo this operation",
                        onConfirm: () => {
                          handlePay();
                        },
                      })
                    }
                  >
                    Checkout
                  </Button>
                </TableCell>
                <TableCell colSpan={3}>
                  <div className={classes.total}>
                    {`TOTAL: ${formatNumber(totalPrice)} VND`}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item sm={3} />
      </Grid>
      <Notification notify={notify} setNotify={setNotify}></Notification>

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Paper>
  );
};

export default ProductContainer;
