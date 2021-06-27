import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/home/home";
import ProductContainer from "./pages/product/product";
import ProfilePage from "./pages/profile/profile";
import AboutUs from "./pages/about-us/about-us";
import CheckoutPage from "./pages/checkout/checkout";
import AdminRoute from "./pages/admin/admin-main";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { ThemeProvider } from "@material-ui/core/styles";
import ThemeContext from "./contexts/theme.context";
import { darkTheme, lightTheme } from "./helpers/theme";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top";

import { Divider } from "@material-ui/core";

import { selectCurrentUser, selectChecking } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";

import CircularProgress from "@material-ui/core/CircularProgress";

import ErrorBoundary from "./features/error-boundary";

const App = ({ currUser, checkUserSession, checking }) => {
  useEffect(() => {
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
  if (checking) return <CircularProgress />;
  else
    return (
      <div>
        <ErrorBoundary>
          <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={themeValue}>
              <Header />
            </ThemeContext.Provider>
            <ScrollToTop />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/about-us" component={AboutUs} />
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
        </ErrorBoundary>
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
