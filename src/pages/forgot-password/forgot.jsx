import React, { useState } from "react";
import Authen_template from "../../conponent/authen_template/authen_template";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [form] = Form.useForm();
  const handleForgotPassword = async (email) => {
    try {
      setLoading(true);
      const response = await api.post("forgot-password", email);
      console.log(response.data);
      nav("/reset_password");
    } catch (err) {
      const errorMessage =
        err.response?.data || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Authen_template>
      <div className="form_header">
        <h1>Forgot Password</h1>
      </div>
      <Form
        form={form}
        onFinish={handleForgotPassword}
        className="form_container"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "please input" }]}
        >
          <Input className="inputplace" placeholder="Email"></Input>
        </Form.Item>
        <div className="button_container">
          <Button
            disabled={loading}
            className="button"
            type="primary"
            htmlType="submit"
          >
            Reset My Password
          </Button>
        </div>
      </Form>
      <Link to="/login">login</Link>
    </Authen_template>
  );
}

export default ForgotPassword;
