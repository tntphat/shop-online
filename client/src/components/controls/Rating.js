import React from "react";
import ErrorMessage from "./errMsg";
import { Controller } from "react-hook-form";
import Rating from "@material-ui/lab/Rating";
import { FormControl } from "@material-ui/core";

export default function DatePicker(props) {
  const { name, label, control, error, ...others } = props;

  return (
    <FormControl fullWidth margin="normal">
      <Controller
        control={control}
        name={name}
        defaultValue={2}
        {...others}
        render={({ ref, ...rest }) => (
          <Rating
            precision={0.5}

            // onChange={}
          />
        )}
      />
      <ErrorMessage error={error} params={name} />
    </FormControl>
  );
}
