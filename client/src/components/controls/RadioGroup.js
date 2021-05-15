import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
} from "@material-ui/core";
import ErrorMessage from "./errMsg";
import { Controller } from "react-hook-form";

export default function RadioGroup(props) {
  const { defVal, name, label, control, error, onChange, items, ...others } =
    props;

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        defaultValue={defVal || ""}
        control={control}
        as={
          <MuiRadioGroup {...others} row onChange={onChange}>
            {items.map((item) => (
              <FormControlLabel
                key={item.id}
                value={item.id}
                control={<Radio />}
                label={item.title}
              />
            ))}
          </MuiRadioGroup>
        }
      />
      <ErrorMessage error={error} params={name} />
    </>
  );
}
