import { Controller } from "react-hook-form";
import React from "react";
import {
  FormControl,
  InputLabel,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";
import ErrorMessage from "../errMsg";

export default function Checkbox(props) {
  const { name, label, control, error } = props;

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        defaultValue={false}
        control={control}
        render={(props) => (
          <MuiCheckbox
            // defaultValue={false}
            color="primary"
            onChange={(e) => props.onChange(e.target.checked)}
            checked={props.value}
          />
        )}
      />
      <ErrorMessage error={error} params={name} />
    </FormControl>
  );
}
