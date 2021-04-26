import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import ErrorMessage from "../errMsg";
import Control from "../controls/Control";
import "./form.styles.css";
import { connect } from "react-redux";

import { TextField, Paper, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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
    // if (type === "register") signUpStart(data);
    // else signInStart(data);
    console.log(data);
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
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="gender-select">Gender</InputLabel>
              <Controller
                control={control}
                name="gender"
                defaultValue=""
                as={
                  <Select id="gender-select">
                    <MenuItem key="male" value="male">
                      Male
                    </MenuItem>
                    <MenuItem key="female" value="female">
                      Female
                    </MenuItem>
                  </Select>
                }
              />
            </FormControl>

            <ErrorMessage error={errors.gender} />

            <Control.Input
              fullWidth
              inputRef={register({ required: true })}
              name="username"
              label="Username"
              error={errors.username}
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
        <Control.DatePicker
          control={control}
          name="hireDate"
          label="Hire Date"
          error={errors.hireDate}
        />

        <Control.Select
          control={control}
          name="type"
          label="Type"
          error={errors.type}
          options={[
            { id: 1, title: "ĐL" },
            { id: 2, title: "ĐL2" },
            { id: 3, title: "ĐL3" },
          ]}
        />

        <Control.Checkbox
          control={control}
          name="isGay"
          label="R U Gay ?"
          error={errors.isGay}
        />

        <Control.RadioGroup
          control={control}
          name="gender2"
          label="Ur gender"
          error={errors.gender2}
          items={[
            { id: "male", title: "Male" },
            { id: "female", title: "feMale" },
            { id: "other", title: "Other" },
          ]}
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
