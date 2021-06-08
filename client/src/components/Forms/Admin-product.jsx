import React from "react";
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
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChanged = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const onSubmit = (data) => {
    data.description = JSON.stringify(data.description);
    data = { ...data, file: selectedFile };
    console.log(data);
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

        <Control.Slate name="description" control={control} />

        <Control.Select
          control={control}
          name="category_id"
          label="Category"
          error={errors.category_id}
          rules={{ required: true }}
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
            inputRef={register({ required: true })}
            label="Sub Category"
            error={errors.sub_category_id}
            rules={{ required: true }}
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
          name="file"
          label="Image"
          type="file"
          onChange={onFileChanged}
          error={errors.file}
        />

        <Control.Input
          fullWidth
          inputRef={register({ required: true })}
          name="price"
          label="Price"
          type="number"
          error={errors.price}
        />

        <Control.Input
          fullWidth
          inputRef={register({ required: true })}
          name="producer"
          label="Producer"
          error={errors.producer}
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
