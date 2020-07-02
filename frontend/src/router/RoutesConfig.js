import React from "react";
import { Redirect } from "react-router-dom";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

function createPrivateRoute(Component) {
  //logic for creating a private route goes here
  return;
}

const RoutesConfig = [
  {
    path: "/",
    component: Home
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
