import React from "react";
import { Redirect } from "react-router-dom";

import Home from "../pages/Home/Home";

function createPrivateRoute(Component) {
  //logic for creating a private route goes here
  return;
}

const RoutesConfig = [
  {
    path: "/",
    component: Home
  }
];

export default RoutesConfig;
