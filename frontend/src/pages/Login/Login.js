import React from "react";
import FormBox from "../../components/Form/Form";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Sign-in.</h1>
      <div className={styles.form_container}>
        <FormBox register={false} />
      </div>
    </div>
  );
}
