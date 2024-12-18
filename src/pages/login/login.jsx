import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Authen_template from "../../conponent/authen_template/authen_template";
import { Button, Form } from "antd";
import "./login.css";
import { provider } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [loading, setLoading] = useState(false);
  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const response = await api.post("login", values);
      console.log(response.data);
      dispatch(login(response.data));
      const { role, token } = response.data;
      localStorage.setItem("token", token);
      // create FCM(Firebase Cloud Messaging) token

      // const fcmToken = await getToken(messaging, {
      //   validKey:
      //     "BItd_f6bOLUL8BLDzJ5NPnWKbdUo2keLV-Bwe8iY75dH94e85yJNtcx9UOiesYo1OWyqXqFJAuSnffphRRAEcMw	",
      // });
      if (role === "MANAGER") {
        navigate("/dashboard/koilist");
      } else if (role === "CUSTOMER") {
        navigate("/");
      } else if (role === "STAFF") {
        navigate("/dashboard-staff/orderlist");
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
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        const response = await api.post("login-google", {
          token: user.accessToken,
        });
        // IdP data available using getAdditionalUserInfo(result)
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        dispatch(login(response.data));
        const { role } = response.data;
        if (role === "MANAGER") {
          navigate("/dashboard/koilist");
        } else if (role === "CUSTOMER") {
          navigate("/");
        } else if (role === "STAFF") {
          navigate("/dashboard-staff/orderlist");
        }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        toast.error("err");
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
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <div style={{ position: "relative" }}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="inputplace"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "25px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
              }}
            >
              {isPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </button>
          </div>
        </Form.Item>

        <div className="button_container">
          <Button disabled={loading} className="button" htmlType="submit">
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
