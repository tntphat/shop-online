import React from "react";
import { Paper } from "@material-ui/core";
import FormAuth from "../../components/Forms/Auth";

const RegisterPage = () => {
  return (
    <Paper style={{ minHeight: "100vh" }}>
      <FormAuth type="sign-in" />
    </Paper>
  );
};

export default RegisterPage;
