import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Typography, makeStyles } from "@material-ui/core";
// import Form from "../../components/form/form.component";
import Button from "@material-ui/core/Button";
import { addMailStart } from "../../redux/mails/mail.actions";
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

const MailForm = ({ setOpenPopup, addMailStart, idMail }) => {
  const { register, handleSubmit, errors, setError, control } = useForm({
    mode: "all",
  });
  const classes = useStyles();
  const onSubmit = (data) => {
    addMailStart({ data });
    console.log(data, idMail);
    setOpenPopup(false);
  };

  return (
    <>
      <form className={classes.formWidth} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Add</Typography>

        <Control.Input
          fullWidth
          inputRef={register({ required: true })}
          name="title"
          label="Title"
          error={errors.title}
        />
        <Control.Input
          fullWidth
          inputRef={register({ required: true })}
          name="content"
          label="Content"
          error={errors.content}
          multiline
          rows={2}
          rowsMax={4}
        />

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
