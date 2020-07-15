import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

import { Layout, Menu, Icon, Button } from "antd";

const { Header, Content, Footer } = Layout;

const Navbar = props => {
  return (
    <Layout>
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
          <Button key="7" type="primary">
            Log out
          </Button>
        </Menu>
      </Header>
      <Content>
        {/* sub nav */}
        <Menu
          theme="light"
          mode="horizontal"
          className={styles.subNav}
          // defaultSelectedKeys="1"
        >
          <Menu.Item key="1" className={styles.menuItem}>
            Global
          </Menu.Item>
          <Menu.Item key="2" className={styles.menuItem}>
            Spreading
          </Menu.Item>
          <Menu.Item key="3" className={styles.menuItem}>
            Local
          </Menu.Item>
          <Menu.Item key="4" className={styles.menuItem}>
            Promoted
          </Menu.Item>
        </Menu>
        {props.children}
      </Content>
    </Layout>
  );
};

export default Navbar;
