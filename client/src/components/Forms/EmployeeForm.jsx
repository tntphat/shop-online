import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Typography, makeStyles } from "@material-ui/core";
// import Form from "../../components/form/form.component";
import Button from "@material-ui/core/Button";
import { signUpStart } from "../../redux/user/user.actions";
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

const MailForm = ({ setOpenPopup, authorities, signUpStart }) => {
  const { register, handleSubmit, errors, control } = useForm({
    mode: "all",
  });
  const classes = useStyles();
  const onSubmit = (data) => {
    signUpStart({ ...data, isEmployee: 1, setOpenPopup });
  };

  return (
    <>
      <form className={classes.formWidth} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Add</Typography>

        <Control.Input
          fullWidth
          inputRef={register({ required: true })}
          name="firstName"
          label="First Name"
          error={errors.firstName}
        />
        <Control.Input
          fullWidth
          inputRef={register({ required: true })}
          name="lastName"
          label="Last Name"
          error={errors.lastName}
        />
        <Control.Select
          control={control}
          name="authority"
          label="Authority"
          error={errors.authority}
          options={authorities.map((authority) => {
            return {
              id: authority._id,
              title: authority.name,
            };
          })}
        />

        <Button className={classes.submitBtn} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

const mapDispatchToProp = (dispatch) => ({
  signUpStart: (data) => dispatch(signUpStart(data)),
});

export default connect(null, mapDispatchToProp)(MailForm);
