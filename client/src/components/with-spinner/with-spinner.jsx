import React from "react";

import Spinner from "../Spinner/Spinner";
const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  console.log("isLoading: ", isLoading);
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
