import React from "react";
import Form from "../../components/UpdateForms/UpdateEmailForm";

export default function UpdateEmailForm() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Update Email.</h1>
      <div className={styles.form_container}>
        <Form />
      </div>
    </div>
  );
}
