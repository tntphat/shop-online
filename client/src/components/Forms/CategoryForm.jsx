import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Typography, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Control from "../../components/controls/Control";
import {
  addCategoryStart,
  editCategoryStart,
  addSubCategoryStart,
} from "../../redux/categories/category.actions";
import { useEffect } from "react";

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

const AdminCategoryAdd = ({
  addCategoryStart,
  editCategoryStart,
  addSubCategoryStart,
  setOpenPopup,
  addSub,
  targetRow,
}) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "all",
  });
  const classes = useStyles();
  const onSubmit = (data) => {
    console.log(data, targetRow);
    if (addSub) {
      if (addSub.category_id) {
        // editSubCategoryStart({...addSub,...data})
        console.log("ok nha", { ...addSub, ...data });
      } else addSubCategoryStart({ category_id: addSub, ...data });
    } else {
      if (targetRow) editCategoryStart({ ...data, _id: targetRow._id });
      else addCategoryStart(data);
    }
    setOpenPopup(false);
  };
  const defaultName =
    (addSub && addSub.name) || (targetRow && targetRow.name) || "";

  return (
    <>
      <form className={classes.formWidth} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2">Category</Typography>

        <Control.Input
          defaultValue={defaultName}
          inputRef={register({ required: true })}
          name="name"
          label="Name" 
          fullWidth
          error={errors.name}
        />

        <Button className={classes.submitBtn} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

const mapDispatchToProp = (dispatch) => ({
  addCategoryStart: (category) => dispatch(addCategoryStart(category)),
  editCategoryStart: (category) => dispatch(editCategoryStart(category)),
  addSubCategoryStart: (subCategory) =>
    dispatch(addSubCategoryStart(subCategory)),
});

export default connect(null, mapDispatchToProp)(AdminCategoryAdd);
// export default AdminCategoryAdd;
