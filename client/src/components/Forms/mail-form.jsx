import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
// import Form from "../../components/form/form.component";
import Button from "@material-ui/core/Button";
import { addMailStart, repMailStart } from "../../redux/mails/mail.actions";
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

const MailForm = ({ setOpenPopup, addMailStart, repMailStart, idMail }) => {
  const { register, handleSubmit, errors, control } = useForm({
    mode: "all",
  });
  const classes = useStyles();
  const onSubmit = (data) => {
    data.content = JSON.stringify(data.content);

    idMail ? repMailStart({ ...data, idMail }) : addMailStart(data);

    setOpenPopup(false);
  };

  return (
    <>
      <form className={classes.formWidth} onSubmit={handleSubmit(onSubmit)}>
        {idMail ? (
          <></>
        ) : (
          <Control.Input
            control={control}
            fullWidth
            inputRef={register({ required: true })}
            name="title"
            label="Title"
            error={errors.title}
          />
        )}

        <Control.Slate name="content" control={control} />

        <Button className={classes.submitBtn} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

const mapDispatchToProp = (dispatch) => ({
  addMailStart: (data) => dispatch(addMailStart(data)),
  repMailStart: (data) => dispatch(repMailStart(data)),
});

export default connect(null, mapDispatchToProp)(MailForm);
