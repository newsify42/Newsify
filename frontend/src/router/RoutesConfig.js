import React from "react";
import decode from "jwt-decode";
import { Redirect } from "react-router-dom";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import UpdatePasswordForm from "../pages/UpdatePassword/UpdatePassword";
import UpdateEmailForm from "../pages/UpdateEmail/UpdateEmail";

function checkToken() {
  try {
    let token = localStorage.getItem("token");
    const decoded = decode(token);
    if (
      decoded.hasOwnProperty("exp") &&
      decoded.hasOwnProperty("iat") &&
      decoded.hasOwnProperty("id")
    ) {
      return true;
    }
  } catch (err) {
    localStorage.clear();
    return false;
  }
}

function createPrivateRoute(Component) {
  return localStorage.getItem("token") && checkToken() ? (
    <Component />
  ) : (
    <Redirect to="/login" />
  );
}

const RoutesConfig = [
  {
    path: "/",
    render: () => createPrivateRoute(Home)
  },
  {
    path: "/update-password",
    render: () => createPrivateRoute(UpdatePasswordForm)
  },
  {
    path: "/update-email",
    render: () => createPrivateRoute(UpdateEmailForm)
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  }
];

export default RoutesConfig;
