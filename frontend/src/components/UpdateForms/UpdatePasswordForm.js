import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { justAxios } from "../../utils/axios";

export default function UpdatePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: null, type: null });
  const [user, setUser] = useState({
    password: "",
    newPassword: ""
  });
  const [formFeedback, setFormFeedback] = useState({
    password: { validationStatus: null, help: null },
    newPassword: { validationStatus: null, help: null }
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
    if (inputType === "newPassword") {
      if (inputString === "") {
        setFormFeedback({
          ...formFeedback,
          newPassword: { validationStatus: null, help: null }
        });
      } else if (inputString.length < 5) {
        setFormFeedback({
          ...formFeedback,
          newPassword: {
            validationStatus: "warning",
            help: "Passwords must be at least 5 characters"
          }
        });
      } else {
        setFormFeedback({
          ...formFeedback,
          newPassword: { validationStatus: "success", help: null }
        });
      }
    } else if (inputType === "password") {
      if (inputString.length < 5) {
        setFormFeedback({
          ...formFeedback,
          password: {
            validationStatus: "warning",
            help: "Reminder: Password must have at least 5 characters"
          }
        });
      } else {
        setFormFeedback({
          ...formFeedback,
          password: { validationStatus: "success", help: null }
        });
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await justAxios().patch("users/update_password");
      console.log(res);
      await setAlert({
        message: "Password successfuly updated",
        type: "success"
      });
      setUser({ password: "", newPassword: "" });
      setFormFeedback({
        password: { validationStatus: null, help: null },
        newPassword: { validationStatus: null, help: null }
      });
    } catch (error) {
      console.log(error);
      setAlert({ message: "Could not update password", type: "error" });
      setFormFeedback({
        ...formFeedback,
        password: {
          validationStatus: "error",
          help: "Incorrect Password"
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item
        hasFeedback
        validateStatus={formFeedback.newPassword.validationStatus}
        help={formFeedback.newPassword.help}
      >
        <Input
          placeholder="new password"
          type="password"
          name="newPassword"
          value={user.newPassword}
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
          placeholder="current password"
          type="password"
          name="password"
          value={user.password}
          onChange={event => {
            handleChange(event);
            formValidation(event);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={
            formFeedback.newPassword.validationStatus !== "success" ||
            formFeedback.password.validationStatus !== "success"
              ? true
              : false
          }
        >
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}
