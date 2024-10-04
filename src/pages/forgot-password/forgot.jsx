import React from "react";
import "./forgot.css";
import Authen_template from "../../conponent/authen_template/authen_template";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
function ForgotPassword() {
  return (
    <Authen_template>
      <h1>Forgot Password?</h1>
      <Form title="">
        <Form.Item>
          <Input placeholder="Email"></Input>
        </Form.Item>
      </Form>
      <Link to="/login">login</Link>
    </Authen_template>
  );
}

export default ForgotPassword;
