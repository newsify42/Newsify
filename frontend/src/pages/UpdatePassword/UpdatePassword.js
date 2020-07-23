import React from "react";
import Form from "../../components/UpdateForms/UpdatePasswordForm";
import Nav from "../../components/Navbar/Navbar";
import styles from "./UpdatePassword.module.css";

export default function UpdatePasswordFrom() {
  return (
    <Nav>
      <div className={styles.formContainer}>
        <h1>Update Password.</h1>
        <div>
          <Form />
        </div>
      </div>
    </Nav>
  );
}
