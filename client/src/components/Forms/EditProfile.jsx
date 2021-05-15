import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Typography, makeStyles } from "@material-ui/core";
// import Form from "../../components/form/form.component";
import Button from "@material-ui/core/Button";
import { editUserStart } from "../../redux/user/user.actions";
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

const EditForm = ({ currentUser, editUserStart }) => {
  const { register, handleSubmit, errors, setError, control } = useForm();
  const classes = useStyles();
  console.log("user: ", currentUser);
  const onSubmit = (data) => {
    console.log(data);
    editUserStart({ ...data });
  };

  return (
    <>
      <form className={classes.formWidth} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Profile</Typography>

        <Control.Input
          fullWidth
          inputRef={register({ required: true })}
          name="firstName"
          label="First Name"
          defaultValue={currentUser.firstName}
          error={errors.firstName}
        />
        <Control.Input
          fullWidth
          inputRef={register({ required: true })}
          name="lastName"
          label="Last Name"
          defaultValue={currentUser.lastName}
          error={errors.lastName}
        />
        <Control.Input
          fullWidth
          inputRef={register({ required: true })}
          name="email"
          label="Email"
          defaultValue={currentUser.email}
          error={errors.email}
        />
        <Control.RadioGroup
          control={control}
          name="gender"
          label="Ur gender"
          error={errors.gender}
          defVal={currentUser.gender}
          items={[
            { id: "male", title: "Male" },
            { id: "female", title: "feMale" },
            { id: "other", title: "Other" },
          ]}
        />
        <Control.Input
          control={control}
          fullWidth
          inputRef={register({ required: true })}
          name="phone"
          label="Phone"
          type="number"
          defaultValue={currentUser.phone}
          error={errors.phone}
        />
        <Control.Input
          fullWidth
          control={control}
          inputRef={register({ required: true })}
          name="address"
          label="Address"
          defaultValue={currentUser.address}
          error={errors.address}
        />
        {/* <Control.Select
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
        /> */}

        <Button
          fullWidth
          className={classes.submitBtn}
          variant="contained"
          type="submit"
        >
          Sưả
        </Button>
      </form>
    </>
  );
};

const mapDispatchToProp = (dispatch) => ({
  editUserStart: (user) => dispatch(editUserStart(user)),
});

export default connect(null, mapDispatchToProp)(EditForm);
