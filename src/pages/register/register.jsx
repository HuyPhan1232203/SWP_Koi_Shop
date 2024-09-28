import Authen_template from "../../conponent/authen_template/authen_template";
import { Button, Form, Input } from "antd";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useState } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleRegister = async (values) => {
    try {
      setLoading(true);
      values.role = "CUSTOMER";
      const response = await api.post("register", values);
      toast.success("Successfully Register New Account!");
      navigate("/login");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <Authen_template>
      <div className="registerForm">
        <h1>Register</h1>
      </div>
      <Form
        labelCol={{
          span: 24,
        }}
        onFinish={handleRegister}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please enter your username" },
            { min: 3, message: "Must be at least 3 characters" },
          ]}
        >
          <input className="inputplace" placeholder="Username"></input>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your username" },
            { min: 3, message: "Must be at least 3 characters" },
          ]}
        >
          <input className="inputplace" placeholder="Username"></input>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Must be at least 6 characters" },
          ]}
        >
          <input className="inputplace" placeholder="Password"></input>
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <input className="inputplace" placeholder="Confirm Password"></input>
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit number!",
            },
          ]}
        >
          <input className="inputplace" placeholder="Phone"></input>
        </Form.Item>

        <div className="button_container">
          <Button
            disabled={loading}
            className="register-button"
            type="primary"
            htmlType="submit"
          >
            <span>Register</span>
          </Button>
        </div>

        <p className="forward-text">
          Already have an account?
          <Link to="/login" className="register">
            Login
          </Link>
        </p>
      </Form>
    </Authen_template>
  );
}

export default RegisterPage;
