import React, { useRef } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Control from "../../components/controls/Control";
import {
  addProductStart,
  editProductStart,
} from "../../redux/product/product.actions";
import { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import { Controller } from "react-hook-form";

import ErrroMessage from "../controls/errMsg";

const useStyles = makeStyles((theme) => ({
  formWidth: {
    width: "500px",
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

const AdminNoteAdd = ({ setOpenPopup, products }) => {
  const { register, handleSubmit, errors, control } = useForm({
    mode: "all",
  });
  const classes = useStyles();
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(0);
  const arrObjs = useRef([]);

  const arrRows = [];

  const calcTotal = (arr) =>
    arr.reduce(
      (a, b) => (b && b.price && b.quantity ? a + +b.price * b.quantity : a),
      0
    );

  // const show = (control,errors) => {
  //   const arrRows = [];

  for (let i = 0; i < count; ++i) {
    arrRows.push(
      <div key={i} style={{ margin: "20px 0" }}>
        <Controller
          defaultValue={null}
          inputRef={register({ required: true })}
          rules={{ required: true }}
          render={(props) => (
            <Autocomplete
              style={{ margin: "20px 0 8px 0" }}
              options={products}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`Product ${i + 1}`}
                  variant="outlined"
                />
              )}
              onChange={(_, data) => {
                props.onChange(data);
                console.log(arrObjs.current);
                if (arrObjs.current[i] && data) {
                  arrObjs.current[i].id = data._id;
                  arrObjs.current[i].price = +data.price;
                } else {
                  arrObjs.current[i] = {
                    quantity:
                      arrObjs.current[i] && +arrObjs.current[i].quantity,
                    id: data && data._id,
                    price: data && data.price,
                  };
                }
                setTotal(calcTotal(arrObjs.current));
              }}
            />
          )}
          name={`product${i}`}
          control={control}
        />
        <ErrroMessage error={errors[`product${i}`]} params={`product${i}`} />

        {/* <Autocomplete
          style={{ margin: "20px 0 8px 0" }}
          options={products}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`Product ${i + 1}`}
              variant="outlined"
            />
          )}
          onChange={(_, data) => {
            console.log(arrObjs.current);
            if (arrObjs.current[i] && data) {
              arrObjs.current[i].id = data._id;
              arrObjs.current[i].price = +data.price;
            } else {
              arrObjs.current[i] = {
                quantity: arrObjs.current[i] && +arrObjs.current[i].quantity,
                id: data && data._id,
                price: data && data.price,
              };
            }
            setTotal(calcTotal(arrObjs.current));
          }}
        /> */}

        <TextField
          fullWidth
          type="number"
          inputRef={register({ required: true })}
          variant="outlined"
          name={`quantity${i}`}
          control={control}
          label={`Quantity ${i + 1}`}
          onChange={(e) => {
            arrObjs.current[i]
              ? (arrObjs.current[i].quantity = e.target.value)
              : (arrObjs.current[i] = { quantity: +e.target.value });
            arrObjs.current[i].id && setTotal(calcTotal(arrObjs.current));
          }}
        />
        <ErrroMessage error={errors[`quantity${i}`]} params={`quantity${i}`} />
      </div>
    );
  }
  //   return arrRows;
  // };

  const onSubmit = (data) => {
    // data.description = JSON.stringify(data.description);
    // data = { ...data, file: selectedFile };
    console.log({
      total_price: total,
      supplier: data.producer,
      goods: arrObjs.current,
    });
    // if (targetRow) editProductStart({ ...data, _id: targetRow._id });
    // else addProductStart(data);
    setOpenPopup(false);
  };

  return (
    <>
      <form className={classes.formWidth} onSubmit={handleSubmit(onSubmit)}>
        {arrRows}
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Add
        </Button>

        <Control.Input
          fullWidth
          inputRef={register({ required: true })}
          name="producer"
          label="Producer"
          control={control}
          error={errors.producer}
        />

        <Typography variant="h5">Total: {total || 0}</Typography>

        <Button
          fullWidth
          className={classes.submitBtn}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default AdminNoteAdd;
