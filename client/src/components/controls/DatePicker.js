import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ErrorMessage from "./errMsg";
import { Controller } from "react-hook-form";
import { FormControl } from "@material-ui/core";

export default function DatePicker(props) {
  const { name, label, control, error, ...others } = props;

  return (
    <FormControl fullWidth margin="normal">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Controller
          control={control}
          name={name}
          defaultValue={new Date()}
          {...others}
          render={({ ref, ...rest }) => (
            <KeyboardDatePicker
              margin="normal"
              id={name}
              label={label}
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              {...rest}
            />
          )}
        />
      </MuiPickersUtilsProvider>
      <ErrorMessage error={error} params={name} />
    </FormControl>
  );
}
