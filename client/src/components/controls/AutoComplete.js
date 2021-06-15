import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FormControl } from "@material-ui/core";
import { Controller } from "react-hook-form";

export default function AutoComplete({
  control,
  defaultValue,
  name,
  error,
  options,
  ...rest
}) {
  return (
    <FormControl fullWidth margin="normal">
      <Controller
        defaultValue={defaultValue}
        render={(props) => (
          <Autocomplete
            {...props}
            {...rest}
            options={options}
            // multiple
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose features"
                variant="outlined"
              />
            )}
            onChange={(_, data) => props.onChange(data)}
          />
        )}
        name={name}
        control={control}
      />
    </FormControl>
  );
}
