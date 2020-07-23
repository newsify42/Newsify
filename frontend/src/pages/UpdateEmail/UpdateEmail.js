import React from "react";
import Form from "../../components/UpdateForms/UpdateEmailForm";
import Nav from "../../components/Navbar/Navbar";

export default function UpdateEmailForm() {
  return (
    <Nav>
      <div className={styles.container}>
        <h1 className={styles.header}>Update Email.</h1>
        <div className={styles.form_container}>
          <Form />
        </div>
      </div>
    </Nav>
  );
}
