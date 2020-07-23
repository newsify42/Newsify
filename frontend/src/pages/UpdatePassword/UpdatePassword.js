import React from "react";
import Form from "../../components/UpdateForms/UpdatePasswordFrom";
import Nav from "../../components/Navbar/Navbar";

export default function UpdatePasswordFrom() {
  return (
    <Nav>
      <div className={styles.container}>
        <h1 className={styles.header}>Update Password.</h1>
        <div className={styles.form_container}>
          <Form />
        </div>
      </div>
    </Nav>
  );
}
