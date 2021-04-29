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
  ...others
}) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Controller
        defaultValue=""
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
      {/* <Controller
              as={
                <MuiSelect>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="simple">
                    Simple Words only (3-5 characters)
                  </MenuItem>
                  <MenuItem value="medium">
                    Medium Words only (5-8 characters)
                  </MenuItem>
                  <MenuItem value="complex">
                    Complex Words only (8+ characters)
                  </MenuItem>
                  <MenuItem value="allwords">
                    Randomly Select Words all across
                  </MenuItem>
                </MuiSelect>
              }
              name="wordlevel"
              rules={{ required: "this is required" }}
              control={control}
              defaultValue=""
              onChange={d => {
                console.log('hello')
                return d[0].target.value;
              }}
            /> */}
      <ErrorMessage error={error} params={name} />
    </FormControl>
  );
}
