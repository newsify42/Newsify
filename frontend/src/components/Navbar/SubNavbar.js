import React from "react";
import styles from "./Navbar.module.css";

import { Layout, Menu, Icon, Button } from "antd";

const SubNav = props => {
  const getContent = () => {
    //placeholder function that will get content based on user's perference
    return;
  };
  return (
    <Menu
      theme="light"
      mode="horizontal"
      className={styles.subNav}
      defaultSelectedKeys="1"
    >
      <Menu.Item
        key="1"
        className={styles.menuItem}
        onClick={() => getContent()}
      >
        Global
      </Menu.Item>
      <Menu.Item
        key="2"
        className={styles.menuItem}
        onClick={() => getContent()}
      >
        Spreading
      </Menu.Item>
      <Menu.Item
        key="3"
        className={styles.menuItem}
        onClick={() => getContent()}
      >
        Local
      </Menu.Item>
      <Menu.Item
        key="4"
        className={styles.menuItem}
        onClick={() => getContent()}
      >
        Promoted
      </Menu.Item>
    </Menu>
  );
};

export default SubNav;
