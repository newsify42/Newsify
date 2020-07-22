import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { justAxios } from "../../utils/axios";

export default function UpdateEmailForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: null, type: null });
  const [user, setUser] = useState({
    newEmail: "",
    password: ""
  });
  const [formFeedback, setFormFeedback] = useState({
    newEmail: { validationStatus: null, help: null },
    password: { validationStatus: null, help: null }
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
    if (inputType === "newEmail") {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const email = inputString.match(emailRegex);
      if (email) {
        setFormFeedback({
          ...formFeedback,
          newEmail: { validationStatus: "success", help: null }
        });
      } else if (inputString === "") {
        setFormFeedback({
          ...formFeedback,
          newEmail: { validationStatus: null, help: null }
        });
      } else {
        setFormFeedback({
          ...formFeedback,
          newEmail: { validationStatus: "warning", help: "Not a valid email" }
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
        message: "Email successfuly updated",
        type: "success"
      });
      setUser({ email: "", password: "" });
      setFormFeedback({
        email: { validationStatus: null, help: null },
        password: { validationStatus: null, help: null }
      });
    } catch (error) {
      console.log(error);
      setAlert({ message: "Could not update email", type: "error" });
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
        validateStatus={formFeedback.newEmail.validationStatus}
        help={formFeedback.newEmail.help}
      >
        <Input
          placeholder="new email"
          type="text"
          name="newEmail"
          value={user.newEmail}
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
            formFeedback.newEmail.validationStatus !== "success" ||
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
