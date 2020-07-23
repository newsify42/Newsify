import React from "react";
import Form from "../../components/UpdateForms/UpdateEmailForm";
import Nav from "../../components/Navbar/Navbar";

export default function UpdateEmailForm() {
  return (
    <Nav>
      <div>
        <h1>Update Email.</h1>
        <div>
          <Form />
        </div>
      </div>
    </Nav>
  );
}
