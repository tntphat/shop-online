import { Controller } from "react-hook-form";
import React, { useState } from "react";
import {
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import ErrorMessage from "./errMsg";

export default function Select({
  error,
  options,
  control,
  label,
  name,
  onChange,
  rules,
  ...others
}) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Controller
        defaultValue=""
        // {...others}
        rules={rules}
        as={
          <MuiSelect>
            <MenuItem
              onClick={() => {
                if (onChange) onChange(null);
              }}
              value=""
            >
              None
            </MenuItem>
            {options.map((item) => (
              <MenuItem
                onClick={() => {
                  if (onChange) onChange(item);
                }}
                key={item.id}
                value={item.id}
              >
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
