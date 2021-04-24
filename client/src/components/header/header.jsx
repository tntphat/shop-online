import React from "react";
import { withRouter } from "react-router-dom";

import HeaderMain from "../header-main/header-main";
import HeaderAuth from "../header-auth/header-auth";

import "./header.css";

const Header = ({ location }) => {
  if (location.pathname.includes("admin")) return <> </>;

  if (location.pathname === "/sign-in" || location.pathname === "/register") {
    const path = location.pathname === "/sign-in" ? "/register" : "/sign-in";
    return <HeaderAuth path={path} />;
  } else {
    return <HeaderMain />;
  }
};

export default withRouter(Header);
