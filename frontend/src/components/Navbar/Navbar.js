import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Layout, Menu, Icon, Button } from "antd";

const { Header, Content, Footer } = Layout;

const Navbar = props => {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content>{props.children}</Content>
    </Layout>
  );
};

export default Navbar;
