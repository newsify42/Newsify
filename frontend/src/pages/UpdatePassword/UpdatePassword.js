import React from "react";
import Form from "../../components/UpdateForms/UpdatePasswordForm";
import Nav from "../../components/Navbar/Navbar";

export default function UpdatePasswordFrom() {
  return (
    <Nav>
      <div>
        <h1>Update Password.</h1>
        <div>
          <Form />
        </div>
      </div>
    </Nav>
  );
}
