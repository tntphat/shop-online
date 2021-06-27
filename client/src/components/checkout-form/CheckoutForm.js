import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Collapse,
} from "@material-ui/core";

import { payInvoiceStart } from "../../redux/invoice/invoice.actions";

import useStyles from "./styles";
import Controls from "../controls/Control";
import { formatNumber } from "../../helpers/number";
export default function CheckoutForm({ cartItems, total, handlePay, user }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [paid, setPaid] = useState("0");

  const stripe = useStripe();
  const elements = useElements();
  const { control, handleSubmit, errors, register } = useForm({ mode: "all" });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(payInvoiceStart({ setClientSecret, total }));
  }, []);

  const classes = useStyles();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const changepaid = (e) => {
    setError();
    setPaid(e.target.value);
  };
  const onSubmit = async (data) => {
    // ev.preventDefault();
    setProcessing(true);
    if (+paid) {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        handlePay({ ...data, paid });
        setProcessing(false);
        setSucceeded(true);
      }
    } else handlePay({ ...data, paid });
  };

  return (
    <form
      className={classes.root}
      id="payment-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box flex={2}>
          <Typography variant="h5">Recipient</Typography>
          <Divider />
          <Box display="flex" flexDirection="row" justifyContent="spacebetween">
            <Box flex={3}>
              <Controls.Input
                fullWidth
                inputRef={register({ required: true })}
                name="firstName"
                label="First Name"
                control={control}
                error={errors.firstName}
                style={{ paddingRight: "20px" }}
                defaultValue={user.firstName}
              />
            </Box>
            <Box flex={2}>
              <Controls.Input
                fullWidth
                inputRef={register({ required: true })}
                name="lastName"
                label="Last Name"
                control={control}
                error={errors.lastName}
                defaultValue={user.lastName}
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="spacebetween">
            <Box flex={3}>
              <Controls.Input
                fullWidth
                inputRef={register({ required: true })}
                name="email"
                label="Email"
                control={control}
                error={errors.email}
                style={{ paddingRight: "20px" }}
                defaultValue={user.email}
              />
            </Box>
            <Box flex={2}>
              <Controls.Input
                fullWidth
                inputRef={register({
                  required: true,
                  minLength: 9,
                  maxLength: 9,
                })}
                minL="9"
                maxL="9"
                type="tel"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">(+84)</InputAdornment>
                  ),
                }}
                name="phone"
                label="Phone"
                control={control}
                error={errors.phone}
                defaultValue={user.phone}
              />
            </Box>
          </Box>
          <Controls.Input
            fullWidth
            inputRef={register({ required: true })}
            name="address"
            label="Address"
            control={control}
            error={errors.address}
            defaultValue={user.address}
          />
        </Box>
        <Box flex={1} style={{ marginLeft: "20px", position: "relative" }}>
          <Typography variant="h5">Your order</Typography>
          <Divider />
          {cartItems.map((item) => (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              my={1}
            >
              <Box
                className={classes.row}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box>
                  <Typography component="span" className={classes.nameProduct}>
                    {item.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    component="span"
                    style={{ opacity: ".6" }}
                  >{`x${item.quantity}`}</Typography>
                </Box>
              </Box>
              <Box>{formatNumber(item.price * item.quantity)}</Box>
            </Box>
          ))}

          <Divider />
          <Typography component="span" style={{ fontWeight: "500" }}>
            Ship fee
          </Typography>

          <Typography component="span" style={{ float: "right" }}>
            0.00
          </Typography>
          <Divider />
          <Box my={1}>
            <Typography
              variant="h6"
              component="span"
              style={{ fontWeight: "400" }}
            >
              Total
            </Typography>

            <Typography
              variant="h6"
              component="span"
              style={{ float: "right", fontWeight: "400" }}
            >
              {formatNumber(total)}
            </Typography>
          </Box>

          <RadioGroup name="paid" value={paid} onChange={changepaid}>
            <FormControlLabel
              label="Cash on delivery"
              value="0"
              control={<Radio color="primary" />}
            />
            <FormControlLabel
              label="Credit card"
              value={"1"}
              control={<Radio color="primary" />}
            />
            <Collapse in={paid === "1"}>
              <Box className={classes.card}>
                <CardElement
                  id="card-element"
                  options={cardStyle}
                  onChange={handleChange}
                  className={classes.stripeElement}
                />
              </Box>
            </Collapse>
          </RadioGroup>
          <Button
            styple={{ position: "absolute", bottom: 0 }}
            fullWidth
            disabled={paid === "1" && (processing || disabled || succeeded)}
            variant="contained"
            type="submit"
          >
            Pay now
          </Button>
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {succeeded && <Typography>Payment succeeded</Typography>}
        </Box>
      </Box>
    </form>
  );
}
