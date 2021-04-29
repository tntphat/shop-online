import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Control from "../controls/Control";
import "./form.styles.css";
import { connect } from "react-redux";

import { Paper, Typography } from "@material-ui/core";

import {
  signInSuccess,
  signInStart,
  signUpStart,
} from "../../redux/user/user.actions";

import { selectErrors } from "../../redux/user/user.selector";

const Form = ({ type, signInStart, signUpStart, errorSignIn }) => {
  const { register, handleSubmit, errors, setError, control } = useForm({
    mode: "all",
  });
  const onSubmit = async (data) => {
    console.log(data);
    if (type === "register") signUpStart(data);
    else signInStart(data);
  };

  useEffect(() => {
    if (errorSignIn)
      setError(errorSignIn.param, { type: "myErr", message: errorSignIn.msg });
  }, [errorSignIn, setError]);

  console.log(type);
  return (
    <Paper square style={{ paddingTop: "3px" }}>
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2" align="center">
          {type === "register" ? "Sign Up" : "Sign In"}
        </Typography>
        {type === "register" ? (
          <div>
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
          </div>
        ) : undefined}

        <Control.Input
          fullWidth
          inputRef={register({
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
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

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Paper>
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
