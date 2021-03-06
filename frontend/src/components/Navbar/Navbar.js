import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import SubNav from "./SubNavbar";

import { Layout, Menu, Icon, Button } from "antd";

const { Header, Content, Footer } = Layout;

const Navbar = props => {
  const logout = () => {
    localStorage.clear();
  };
  return (
    <Layout className={styles.layout}>
      <Header className={styles.container}>
        <Menu
          theme="dark"
          mode="horizontal"
          className={styles.nav}
          // defaultSelectedKeys="1"
        >
          <Menu.Item key="1" className={styles.menuItem}>
            <NavLink
              to="/"
              activeClassName={styles.navItemSelected}
              className={styles.navItem}
              exact
            >
              All
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" className={styles.menuItem}>
            <NavLink
              to="/pol"
              activeClassName={styles.navItemSelected}
              className={styles.navItem}
            >
              Politics
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" className={styles.menuItem}>
            <NavLink
              to="/sport"
              activeClassName={styles.navItemSelected}
              className={styles.navItem}
            >
              Sports
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4" className={styles.menuItem}>
            <NavLink
              to="/tv"
              activeClassName={styles.navItemSelected}
              className={styles.navItem}
            >
              Film & TV
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5" className={styles.menuItem}>
            <NavLink
              to="/music"
              activeClassName={styles.navItemSelected}
              className={styles.navItem}
            >
              Music
            </NavLink>
          </Menu.Item>
          <Menu.Item key="6" className={styles.menuItem}>
            <NavLink
              to="/games"
              activeClassName={styles.navItemSelected}
              className={styles.navItem}
            >
              Video Games
            </NavLink>
          </Menu.Item>
          <Link to="/login">
            <Button key="7" type="primary" onClick={logout}>
              Log out
            </Button>
          </Link>
        </Menu>
      </Header>
      <Content className={styles.content}>
        <SubNav />
        {props.children}
      </Content>
    </Layout>
  );
};

export default Navbar;
