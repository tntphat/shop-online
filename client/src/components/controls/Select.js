import { Controller } from "react-hook-form";
import React from "react";
import {
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import ErrorMessage from "../errMsg";

export default function Select({
  error,
  options,
  control,
  label,
  name,
  ...others
}) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Controller
        defaultValue=""
        as={
          <MuiSelect {...others}>
            <MenuItem value="">None</MenuItem>
            {options.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </MuiSelect>
        }
        name={name}
        control={control}
      />
      <ErrorMessage error={error} params={name} />
    </FormControl>
  );
}
