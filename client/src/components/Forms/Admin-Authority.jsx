import Control from "../controls/Control";
import { connect } from "react-redux";
import React from "react";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import AuthoritiesSelect from "../controls/AutoComplete";
import { addAuthorityStart } from "../../redux/authority/authority.actions";

function AuthorityForm({ addAuthorityStart, setOpenPopup }) {
  const { control, handleSubmit, errors, register } = useForm();
  const onSubmit = (data) => {
    const { authorities, ...others } = data;
    const role = authorities.reduce((a, b) => a * b.id, 1);
    addAuthorityStart({ role, ...others });
    setOpenPopup(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Control.Input
        fullWidth
        inputRef={register({ required: true })}
        name="name"
        label="Authority Name"
        error={errors.name}
      />
      <AuthoritiesSelect control={control} />
      <Button variant="contained" fullWidth type="submit">
        Add
      </Button>
    </form>
  );
}

const mapDispatchToProp = (dispatch) => ({
  addAuthorityStart: (data) => dispatch(addAuthorityStart(data)),
});

export default connect(null, mapDispatchToProp)(AuthorityForm);
