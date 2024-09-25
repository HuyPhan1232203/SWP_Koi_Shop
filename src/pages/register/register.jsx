import Authen_template from "../../conponent/authen_template/authen_template";
import { Button, Form, Input } from "antd";
import "./register.css";
import { Link } from "react-router-dom";
function RegisterPage() {
  return (
    <Authen_template>
      <div className="registerForm">
        <h1>Register</h1>
      </div>
      <Form
        labelCol={{
          span: 24,
        }}
      >
        <Form.Item
          label="Username:"
          name="txtUsername"
          rules={[
            { required: true, message: "Please enter your username" },
            { min: 3, message: "Must be at least 3 characters" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password:"
          name="txtPassword"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Must be at least 6 characters" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password:"
          name="txtConfirmPassword"
          dependencies={["txtPassword"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("txtPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Phone:"
          name="txtPhone"
          rules={[
            { required: true, message: "Please enter your phone number" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address:"
          name="txtAddress"
          rules={[{ required: true, message: "Please enter your address!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <div className="button_container">
          <Button>Register</Button>
        </div>
        <Link to="/login">login</Link>
      </Form>
    </Authen_template>
  );
}

export default RegisterPage;
