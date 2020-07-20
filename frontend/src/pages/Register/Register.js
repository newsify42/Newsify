import React from "react";
import FormBox from "../../components/Form/Form";
import styles from "./Register.module.css";

export default function Register() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Sign-up.</h1>
      <div className={styles.form_container}>
        <FormBox register={true} />
      </div>
    </div>
  );
}
