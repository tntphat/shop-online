import React from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Typography, makeStyles } from "@material-ui/core";
// import Form from "../../components/form/form.component";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ErrorMessage from "./errMsg";
import { addMailStart } from "../redux/mails/mail.actions";

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

const MailForm = ({ setOpenPopup, addMailStart, idMail }) => {
  const { register, handleSubmit, errors, setError, control } = useForm({
    mode: "all",
  });
  const classes = useStyles();
  const onSubmit = (data) => {
    // addMailStart({data});
    console.log(data, idMail);
    setOpenPopup(false);
  };

  return (
    <>
      <form className={classes.formWidth} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2">Add</Typography>

        <TextField
          inputRef={register({ required: true })}
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <ErrorMessage error={errors.title} params="title" minL="4" />
        <TextField
          inputRef={register({ required: true })}
          name="content"
          label="Content"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={2}
          rowsMax={4}
        />
        <ErrorMessage error={errors.content} params="content" minL="4" />

        <Button className={classes.submitBtn} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

const mapDispatchToProp = (dispatch) => ({
  addMailStart: (data) => dispatch(addMailStart(data)),
});

export default connect(null, mapDispatchToProp)(MailForm);
