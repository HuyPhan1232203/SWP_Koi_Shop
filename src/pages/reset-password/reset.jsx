import React from "react";
import Authen_template from "../../conponent/authen_template/authen_template";
import { Button, Form, Input } from "antd";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";

function ResetPassword() {
  const [form] = Form.useForm();
  const location = useLocation(); // Get current location object (contains the URL)

  const handleResetPassword = async (password) => {
    try {
      console.log(location.search);
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      localStorage.setItem("token", token);
      await api.post("reset-password", password);
      toast.success("Success!");
    } catch (err) {
      toast.error("err");
    }
  };
  return (
    <Authen_template>
      <div className="form_header">
        <h1>Reset Password</h1>
      </div>
      <Form
        form={form}
        className="form_container"
        onFinish={handleResetPassword}
      >
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "please input" },
            { min: 6, message: "Must be at least 6 characters" },
          ]}
        >
          <Input className="inputplace" placeholder="Password"></Input>
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "please input" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Password do not match"));
              },
            }),
          ]}
        >
          <Input className="inputplace" placeholder="Confirm Password"></Input>
        </Form.Item>
        <div className="button_container">
          <Button className="button" type="primary" htmlType="submit">
            Reset My Password
          </Button>
        </div>
      </Form>
      <Link to="/login">login</Link>
    </Authen_template>
  );
}

export default ResetPassword;
