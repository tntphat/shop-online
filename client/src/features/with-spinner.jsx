import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const WithSpinner =
  (WrappedComponent) =>
  ({ isLoading, ...otherProps }) => {
    console.log("isLoading: ", isLoading);
    return isLoading ? (
      <CircularProgress />
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

export default WithSpinner;
