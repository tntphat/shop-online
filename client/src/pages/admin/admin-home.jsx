import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";

const AdminAddproduct = () => {
  const history = useHistory();
  return (
    <>
      <Button onClick={() => history.push("/")} variant="contained">
        Home
      </Button>
      <Typography variant="h2">Admin Page</Typography>
    </>
  );
};

export default AdminAddproduct;
