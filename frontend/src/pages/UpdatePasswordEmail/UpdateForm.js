import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { justAxios } from "../../utils/axios";

export default function UpdateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: null, type: null });
  const [user, setUser] = useState({
    email: "",
    password: "",
    newPassword: ""
  });
  const [formFeedback, setFormFeedback] = useState({
    email: { validationStatus: null, help: null },
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
    if (inputType === "email") {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const email = inputString.match(emailRegex);
      if (email) {
        setFormFeedback({
          ...formFeedback,
          email: { validationStatus: "success", help: null }
        });
      } else if (inputString === "") {
        setFormFeedback({
          ...formFeedback,
          email: { validationStatus: null, help: null }
        });
      } else {
        setFormFeedback({
          ...formFeedback,
          email: { validationStatus: "warning", help: "Not a valid email" }
        });
      }
    } else if (inputType === "newPassword") {
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

  return (
    <Form>
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
          onChange={event => {
            handleChange(event);
            formValidation(event);
          }}
        />
      </Form.Item>
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
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}
