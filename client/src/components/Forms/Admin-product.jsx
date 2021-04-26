import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Typography, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Control from "../../components/controls/Control";
import {
  addProductStart,
  editProductStart,
} from "../../redux/product/product.actions";

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

const AdminProductAdd = ({
  addProductStart,
  editProductStart,
  setOpenPopup,
  setTargetRow,
  targetRow,
}) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "all",
  });
  const classes = useStyles();
  const onSubmit = (data) => {
    const { name, type } = data;
    if (targetRow) editProductStart({ ...data, _id: targetRow._id });
    else addProductStart({ name, type });
    setOpenPopup(false);
  };

  console.log(targetRow, "aaaaaaa");

  return (
    <>
      <form className={classes.formWidth} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2">Add</Typography>

        <Control.Input
          defaultValue={targetRow ? targetRow.name : ""}
          inputRef={register({ required: true })}
          name="name"
          label="Name"
          fullWidth
          error={errors.name}
        />

        <Control.Input
          defaultValue={targetRow ? targetRow.type : ""}
          inputRef={register({ required: true })}
          name="type"
          label="Type"
          fullWidth
          error={errors.type}
        />

        <Button className={classes.submitBtn} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

const mapDispatchToProp = (dispatch) => ({
  addProductStart: (product) => dispatch(addProductStart(product)),
  editProductStart: (product) => dispatch(editProductStart(product)),
});

export default connect(null, mapDispatchToProp)(AdminProductAdd);
