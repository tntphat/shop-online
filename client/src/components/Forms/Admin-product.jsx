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
import { useState } from "react";

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
  categories,
}) => {
  console.log("categories in product form : ", categories);
  const { register, handleSubmit, errors, control } = useForm({
    mode: "all",
  });
  const classes = useStyles();
  const [curCategory, setCurCategory] = useState(null);
  const onSubmit = (data) => {
    if (targetRow) editProductStart({ ...data, _id: targetRow._id });
    else addProductStart(data);
    setOpenPopup(false);
  };

  console.log(targetRow, "aaaaaaa");
  console.log(curCategory, "rerendered");

  return (
    <>
      <form className={classes.formWidth} onSubmit={handleSubmit(onSubmit)}>
        <Control.Input
          defaultValue={targetRow ? targetRow.name : ""}
          inputRef={register({ required: true })}
          name="name"
          label="Name"
          fullWidth
          error={errors.name}
        />

        <Control.Select
          control={control}
          name="category_id"
          label="Category"
          error={errors.type}
          options={categories.map((category) => {
            return {
              id: category._id,
              title: category.name,
              sub_categories: category.sub_categories,
            };
          })}
          onChange={setCurCategory}
        />
        {curCategory ? (
          <Control.Select
            control={control}
            name="sub_category_id"
            label="Sub Category"
            error={errors.type}
            options={curCategory.sub_categories.map((sub_category) => {
              return {
                id: sub_category._id,
                title: sub_category.name,
              };
            })}
          />
        ) : (
          <></>
        )}

        <Control.Input
          fullWidth
          inputRef={register({ required: true })}
          name="price"
          label="Price"
          type="number"
          error={errors.price}
        />

        <Control.DatePicker
          control={control}
          name="expiry_date"
          label="Expiry Date"
          error={errors.expiry_date}
        />

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

const mapDispatchToProp = (dispatch) => ({
  addProductStart: (product) => dispatch(addProductStart(product)),
  editProductStart: (product) => dispatch(editProductStart(product)),
});

export default connect(null, mapDispatchToProp)(AdminProductAdd);
