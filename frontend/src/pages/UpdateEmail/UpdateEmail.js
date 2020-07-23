import React from "react";
import Form from "../../components/UpdateForms/UpdateEmailForm";
import Nav from "../../components/Navbar/Navbar";
import styles from "./UpdateEmail.module.css";

export default function UpdateEmailForm() {
  return (
    <Nav>
      <div className={styles.formContainer}>
        <h1>Update Email.</h1>
        <div>
          <Form />
        </div>
      </div>
    </Nav>
  );
}
