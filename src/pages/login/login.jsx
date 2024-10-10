import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Authen_template from "../../conponent/authen_template/authen_template";
import { Button, Form } from "antd";
import "./login.css";
import { provider } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const response = await api.post("login", values);
      console.log(response.data);
      dispatch(login(response.data));
      sessionStorage.setItem("username", response.data.username);
      sessionStorage.setItem("role", response.data.role);
      sessionStorage.setItem("id", response.data.id);

      const { role, token } = response.data;
      localStorage.setItem("token", token);
      if (role === "MANAGER") {
        navigate("/dashboard/koilist");
        // navigate(0);
      } else if (role === "CUSTOMER") {
        navigate("/");
        // navigate(0);
      } else if (role === "STAFF") {
        navigate("/dashboard-staff/orderlist");
        // navigate(0);
      }

      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  const handleLoginWithEmail = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        sessionStorage.setItem("username", user.displayName);
        console.log(user.email);
        // IdP data available using getAdditionalUserInfo(result)
        navigate("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        error.code;
        error.message;
        // The email of the user's account used.
        error.customData.email;
        // The AuthCredential type that was used.
        GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <Authen_template>
      <div className="form_header">
        <h1>Login</h1>
      </div>
      <Form
        className="loginForm"
        labelCol={{
          span: 24,
        }}
        onFinish={handleLogin}
      >
        <Form.Item
          // label="Username"
          // name="txtUsername"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
          ]}
        >
          <input className="inputplace" placeholder="Email"></input>
        </Form.Item>
        <Form.Item
          // label="Password"
          // name="txtPassword"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <input
            type="password"
            className="inputplace"
            placeholder="Password"
          ></input>
        </Form.Item>
        <div className="button_container">
          <Button
            disabled={loading}
            className="button"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
          <Button className="gg-button" onClick={handleLoginWithEmail}>
            <GoogleOutlined />
            Login Google
          </Button>
        </div>
        <p className="forward-text">
          Don't have an account?
          <Link to="/register" className="register">
            Register
          </Link>{" "}
        </p>
        <Link to="/forgot_password" style={{ marginLeft: "150px" }}>
          Forgot password?
        </Link>
      </Form>
    </Authen_template>
  );
}

export default LoginPage;
