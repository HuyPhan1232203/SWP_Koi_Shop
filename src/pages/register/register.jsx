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
          name="txtUsername"
          rules={[
            { required: true, message: "Please enter your username" },
            { min: 3, message: "Must be at least 3 characters" },
          ]}
        >
          <input className="inputplace" placeholder="Username"></input>
        </Form.Item>

        <Form.Item
          name="txtPassword"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Must be at least 6 characters" },
          ]}
        >
          <input className="inputplace" placeholder="Password"></input>
        </Form.Item>

        <Form.Item
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
          <input className="inputplace" placeholder="Confirm Password"></input>
        </Form.Item>

        <Form.Item
          name="txtPhone"
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

        <Form.Item
          name="txtAddress"
          rules={[{ required: true, message: "Please enter your address!" }]}
        >
          <input className="inputplace" placeholder="Address"></input>
        </Form.Item>

        <div className="button_container">
          <Button>Register</Button>
        </div>
        <p className="forward-text">
          Already have an account?
          <Link to="/login">login</Link>
        </p>
      </Form>
    </Authen_template>
  );
}

export default RegisterPage;
