import React from "react";
import { TextField } from "@material-ui/core";
import ErrorMessage from "../errMsg";

export default function Input(props) {
  const { name, error, minL, ...others } = props;
  return (
    <>
      <TextField margin="normal" variant="outlined" name={name} {...others} />
      <ErrorMessage error={error} params={name} minL={minL || 0} />
    </>
  );
}
