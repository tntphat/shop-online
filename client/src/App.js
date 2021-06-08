import React, { useState, useMemo, useEffect, useContext } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { Route, Switch, Redirect } from "react-router-dom";
import RegisterPage from "./pages/register/register";
import SignInPage from "./pages/sign-in/sign-in";
import HomePage from "./pages/home/home";
import ProductContainer from "./pages/product/product";
import ProfilePage from "./pages/profile/profile";
import CheckoutPage from "./pages/checkout/checkout";
import AdminRoute from "./pages/admin/admin-main";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ThemeContext from "./contexts/theme.context";

import { Divider } from "@material-ui/core";
import { CartContext } from "./providers/cart/cart.provider";

import { selectCurrentUser, selectChecking } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";

import Spinner from "../src/components/Spinner/Spinner";

// const RegisterPage = lazy(() => import("./pages/register/register"));
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    navBar: {
      main: "#2d3436",
    },
    text: {
      main: "#f1f2f6",
    },
    table: {
      main: "#2d3436",
    },
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    navBar: {
      main: "#f1f2f6",
    },
    text: {
      main: "#2d3436",
    },
    table: {
      main: "#f1f2f6",
    },
  },
});
const App = ({ currUser, checkUserSession, checking }) => {
  console.log("RENDER APP.JS");
  useEffect(() => {
    console.log("run Effect Check User S");
    checkUserSession();
  }, [checkUserSession]);

  // const { cartItems } = useContext(CartContext);
  const [night, setNight] = useState(false);
  useEffect(() => {
    if (Cookies.get("isNight") !== "true") setNight(true);
    window.addEventListener("beforeunload", function (event) {
      console.log("I am the 1st one.");
    });
    window.addEventListener("unload", function (event) {
      console.log("I am the 3rd one.");
    });
  }, []);
  const themeValue = useMemo(() => {
    return { night, setNight };
  }, [night, setNight]);
  const theme = night ? darkTheme : lightTheme;
  console.log("CURRENT USER IN APP : ", currUser, checking);
  if (checking) return <Spinner />;
  else
    return (
      <div>
        <ThemeProvider theme={theme}>
          <ThemeContext.Provider value={themeValue}>
            <Header />
          </ThemeContext.Provider>

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/products" component={ProductContainer} />
            <Route
              path="/checkout"
              render={() => (
                <CheckoutPage
                  name={
                    currUser && currUser.firstName + " " + currUser.lastName
                  }
                />
              )}
            />
            <AdminRoute path="/admin" />
            <Route
              exact
              path="/profiles"
              render={() =>
                currUser ? <ProfilePage /> : <Redirect to="/sign-in" />
              }
            />
          </Switch>
          <Divider />
          <Footer />
        </ThemeProvider>
      </div>
    );
};

const mapStateToProp = (state) => ({
  currUser: selectCurrentUser(state),
  checking: selectChecking(state),
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProp, mapDispatchToProps)(App);
