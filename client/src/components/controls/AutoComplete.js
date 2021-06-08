import React from "react";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FormControl } from "@material-ui/core";
import { Controller } from "react-hook-form";
import dataDrawer from "../drawer/drawer.data";

export default function AutoComplete({ control }) {
  return (
    <FormControl fullWidth margin="normal">
      <Controller
        defaultValue={[]}
        render={(props) => (
          <Autocomplete
            {...props}
            options={dataDrawer}
            multiple
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
        name="authorities"
        control={control}
      />
    </FormControl>
  );
}
