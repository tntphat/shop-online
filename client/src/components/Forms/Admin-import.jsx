import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
// import Form from "../../components/form/form.component";
import Button from "@material-ui/core/Button";
import { editNoteStart } from "../../redux/note/note.actions";
import Control from "../controls/Control";

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

const ImportNoteFrom = ({ setOpenPopup, note, setNotify }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control } = useForm({
    mode: "all",
  });
  const classes = useStyles();
  const dataToNote = [];
  const dataToImportNote = [];
  const dataProducts = [];
  const onSubmit = (data) => {
    note.goods.forEach((prod, ind) => {
      dataToImportNote.push({
        product_id: prod.product_id._id,
        quantity: data[`quantity${ind}`],
      });
      dataProducts.push(
        +prod.product_id.quantity_left + +data[`quantity${ind}`]
      );
      dataToNote.push({
        product_id: prod.product_id._id,
        quantity: prod.quantity,
        quantityLeft: prod.quantityLeft - data[`quantity${ind}`],
      });
    });
    dispatch(
      editNoteStart({
        dataToImportNote,
        dataToNote,
        dataProducts,
        setOpenPopup,
        setNotify,
        id: note._id,
      })
    );
  };

  return (
    <>
      <form className={classes.formWidth} onSubmit={handleSubmit(onSubmit)}>
        {note.goods.map((product, index) => (
          <div key={index}>
            <span>{product.product_id.name}:</span>
            <div>
              {product.quantityLeft}/{product.quantity}
            </div>
            <Control.Input
              fullWidth
              type="number"
              inputRef={register({
                required: true,
                min: 0,
                max: product.quantityLeft,
              })}
              name={`quantity${index}`}
              label=""
              error={errors[`quantity${index}`]}
              min={0}
              max={product.quantityLeft}
              control={control}
            />
          </div>
        ))}

        <Button className={classes.submitBtn} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default ImportNoteFrom;
