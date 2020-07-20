import React, { useState } from "react";
import { justAxios } from "../../utils/axios";
import styles from "./Form.module.css";
import { Form, Input, Button, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

export default function FormBox({ register }) {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: null, type: null });
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formFeedback, setFormFeedback] = useState({
    email: { validationStatus: null, help: null },
    password: { validationStatus: null, help: null },
    confirmPassword: { validationStatus: null, help: null }
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const formValidation = e => {
    let inputString = e.target.value;
    let inputType = e.target.name;
    if (inputType === "email") {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const email = inputString.match(emailRegex);
      if (email) {
        setFormFeedback({
          ...formFeedback,
          email: { validationStatus: "success", help: null }
        });
      } else {
        setFormFeedback({
          ...formFeedback,
          email: { validationStatus: "warning", help: "Not a valid email" }
        });
      }
    } else if (inputType === "password") {
      if (inputString.length >= 5 && inputString === user.confirmPassword) {
        setFormFeedback({
          ...formFeedback,
          password: { validationStatus: "success", help: null },
          confirmPassword: { validateStatus: "success", help: null }
        });
      } else if (inputString.length < 5) {
        setFormFeedback({
          ...formFeedback,
          password: {
            validationStatus: "warning",
            help: "Passwords must be at least 5 characters"
          }
        });
      } else if (inputString !== user.confirmPassword) {
        setFormFeedback({
          ...formFeedback,
          confirmPassword: {
            validationStatus: "warning",
            help: "Passwords do not match"
          },
          password: { validationStatus: "success", help: null }
        });
      }
    } else if (inputType === "confirmPassword") {
      if (inputString === user.password) {
        setFormFeedback({
          ...formFeedback,
          confirmPassword: { validationStatus: "success", help: null },
          password: { validationStatus: "success", help: null }
        });
      } else {
        setFormFeedback({
          ...formFeedback,
          confirmPassword: {
            validationStatus: "warning",
            help: "Passwords do not match"
          }
        });
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let target = register ? "users/register" : "users/login";
    try {
      setIsLoading(true);
      delete user.confirmPassword;
      const res = await justAxios().post(target, user);
      if (res.data.hasOwnProperty("token")) {
        localStorage.setItem("token", res.data.token);
      }
      let message = register
        ? "Account successfully created."
        : "Successful login.";
      await setAlert({
        message: message,
        type: "success"
      });
      setUser({ email: "", password: "", confirmPassword: "" });
      setFormFeedback({
        email: { validationStatus: null, help: null },
        username: { validationStatus: null, help: null },
        password: { validationStatus: null, help: null },
        confirmPassword: { validationStatus: null, help: null }
      });
    } catch (error) {
      setAlert({ message: "That email is already taken", type: "error" });
      setFormFeedback({
        ...formFeedback,
        email: {
          validationStatus: "error",
          help: "Email already taken"
        },
        confirmPassword: { validationStatus: null, help: null }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.form_container}>
      <Form.Item
        hasFeedback
        validateStatus={formFeedback.email.validationStatus}
        help={formFeedback.email.help}
      >
        <Input
          placeholder="email"
          type="text"
          name="email"
          value={user.email}
          prefix={<MailOutlined style={{ color: "rgba(0,0, 0, .25)" }} />}
          onChange={event => {
            handleChange(event);
            formValidation(event);
          }}
        />
      </Form.Item>
      <Form.Item
        hasFeedback
        validateStatus={formFeedback.password.validationStatus}
        help={formFeedback.password.help}
      >
        <Input
          placeholder="password"
          type="password"
          name="password"
          value={user.password}
          prefix={<LockOutlined style={{ color: "rgba(0,0, 0, .25)" }} />}
          onChange={event => {
            handleChange(event);
            formValidation(event);
          }}
        />
      </Form.Item>
      {register ? (
        <Form.Item
          hasFeedback
          validateStatus={formFeedback.confirmPassword.validationStatus}
          help={formFeedback.confirmPassword.help}
        >
          <Input
            placeholder="confirm password"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            prefix={<LockOutlined style={{ color: "rgba(0,0, 0, .25)" }} />}
            onChange={event => {
              handleChange(event);
              formValidation(event);
            }}
          />
        </Form.Item>
      ) : null}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={
            formFeedback.email.validationStatus !== "success" ||
            formFeedback.password.validationStatus !== "success" ||
            (register &&
              formFeedback.confirmPassword.validationStatus !== "success")
              ? true
              : false
          }
        >
          {register ? "Register" : "Login"}
        </Button>
      </Form.Item>
      <Alert
        message={alert.message}
        type={alert.type}
        afterClose={() => setAlert({ message: null, type: null })}
      />
    </Form>
  );
}
