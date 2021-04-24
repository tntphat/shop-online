import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import ErrorMessage from "../errMsg";
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
  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const { register, handleSubmit, errors, setError, control } = useForm({
    mode: "all",
  });
  const onSubmit = async (data) => {
    // console.log(type === "register");
    if (type === "register") signUpStart(data);
    else signInStart(data);

    // const res = await axiosInstance.post(`/${type}`, data);
    // const { _id, username } = res.data.user;
    // console.log({ _id, username });
    // Cookies.set("user", JSON.stringify(res.data.data));
    // signInSuccess({ _id, username });
    // dispatch({ type: "SIGN_IN_SUCCESS", payload: { _id, username } });

    // const data = error.response.data;
    // setError(data.param, { type: "myErr", message: data.msg });
    // if (error.response.data === "Fail")
    //   setError("firstName", { type: "myErr", message: "yêu Linh" });
  };

  useEffect(() => {
    if (errorSignIn)
      setError(errorSignIn.param, { type: "myErr", message: errorSignIn.msg });
  }, [errorSignIn, setError]);

  // const validateUserName = async (value) => {
  //   // await sleep(2000);
  //   if (value !== "fat") {
  //     setError("username", { type: "validate" });
  //     return false;
  //   } else {
  //     clearErrors("username");
  //   }
  // };
  console.log(type);
  return (
    <Paper square style={{ paddingTop: "3px" }}>
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2" align="center">
          {type === "register" ? "Sign Up" : "Sign In"}
        </Typography>
        {type === "register" ? (
          <div>
            <TextField
              inputRef={register({ required: true })}
              name="firstName"
              label="First Name:"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage error={errors.firstName} />

            <TextField
              inputRef={register({ required: true })}
              name="lastName"
              label="Last Name:"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage error={errors.lastName} />
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

            <TextField
              inputRef={register({ required: true })}
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage error={errors.username} params="username" minL="4" />
          </div>
        ) : undefined}

        <TextField
          inputRef={register({
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          })}
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <ErrorMessage error={errors.email} />

        <TextField
          inputRef={register({ required: true, minLength: 4 })}
          name="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
        />
        <ErrorMessage error={errors.password} params="password" minL="4" />

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
