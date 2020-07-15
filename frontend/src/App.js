import React from "react";
import "antd/dist/antd.css";
import AppRouter from "./router";
import { withCookies } from "react-cookie";

const App = props => {
  console.log(props);
  return <AppRouter />;
};

export default withCookies(App);
