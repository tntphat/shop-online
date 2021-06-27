import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Control from "../controls/Control";
import "./form.styles.css";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { Typography } from "@material-ui/core";

import {
  signInSuccess,
  signInStart,
  signUpStart,
} from "../../redux/user/user.actions";

import { selectErrors } from "../../redux/user/user.selector";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30vw",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    },
  },
  containSwitch: {
    margin: "8px 0",
  },
  switch: {
    fontWeight: "500",
    color: "#636e72",
    cursor: "pointer",
  },
}));

const Form = ({
  signInStart,
  signUpStart,
  errorSignIn,
  isEmployee,
  setOpenPopup,
  isIn,
  setIsIn,
}) => {
  const { register, handleSubmit, errors, setError, control } = useForm({
    mode: "all",
  });

  // const [isIn, setIsIn] = useState(true);
  const onSubmit = (data) => {
    if (!isIn && !isEmployee)
      signUpStart({
        ...data,
        setOpenPopup,
        isEmployee: isEmployee,
      });
    else signInStart({ ...data, isEmployee: isEmployee || 0, setOpenPopup });
  };

  const classes = useStyles();

  useEffect(() => {
    if (errorSignIn)
      setError(errorSignIn.param, { type: "myErr", message: errorSignIn.msg });
  }, [errorSignIn, setError]);

  const setMode = () => {
    setIsIn((state) => !state);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      {!isIn && !isEmployee ? (
        <>
          <Control.Input
            fullWidth
            inputRef={register({ required: true })}
            name="firstName"
            label="First Name:"
            error={errors.firstName}
          />

          <Control.Input
            fullWidth
            inputRef={register({ required: true })}
            name="lastName"
            label="Last Name:"
            error={errors.lastName}
          />
          <Control.Input
            fullWidth
            inputRef={register({ required: true })}
            name="phone"
            type="number"
            label="Phone Number"
            error={errors.phone}
          />
          <Control.Input
            fullWidth
            inputRef={register({ required: true })}
            name="address"
            label="Address"
            error={errors.address}
          />
          <Control.RadioGroup
            control={control}
            name="gender"
            label="Ur gender"
            error={errors.gender}
            items={[
              { id: "male", title: "Male" },
              { id: "female", title: "feMale" },
              { id: "other", title: "Other" },
            ]}
          />
        </>
      ) : undefined}

      <Control.Input
        fullWidth
        inputRef={register({
          required: true,
          pattern: isEmployee || /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        })}
        name="email"
        label="Email"
        error={errors.email}
      />

      <Control.Input
        fullWidth
        inputRef={register({ required: true, minLength: 4 })}
        name="password"
        label="Password"
        type="password"
        error={errors.password}
      />
      {!isEmployee ? (
        <Typography
          variant="body2"
          align="center"
          className={classes.containSwitch}
        >
          <span>Bạn {(isIn && "chưa") || "đã"} có tài khoản? </span>
          <span
            className={classes.switch}
            onClick={() => {
              setMode();
            }}
          >
            {(isIn && "Đăng ký ngay") || "Đăng nhập"}
          </span>
        </Typography>
      ) : undefined}
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Submit
      </Button>
    </form>
  );
};

const mapStateToProp = (state) => ({
  errorSignIn: selectErrors(state),
});

const mapDispatchToProp = (dispatch) => ({
  signInSuccess: (user) => dispatch(signInSuccess(user)),
  signInStart: (user) => dispatch(signInStart(user)),
  signUpStart: (user) => dispatch(signUpStart(user)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Form);
