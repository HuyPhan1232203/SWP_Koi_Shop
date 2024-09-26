import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Authen_template from "../../conponent/authen_template/authen_template";
import { Button, Form, Input } from "antd";
import "./login.css";
import { provider } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { GoogleOutlined } from "@ant-design/icons";
function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    try {
      const response = await api.post("login", values);
      toast.success("Successfully Login!");
      console.log(response);
      const { role, token } = response.data;
      localStorage.setItem("token", token);

      if (role === "ADMIN") {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleLoginWithEmail = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
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
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter your username",
            },
          ]}
        >
          <input className="inputplace" placeholder="Username"></input>
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
          <Button className="button" type="primary" htmlType="submit">
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
      </Form>
    </Authen_template>
  );
}

export default LoginPage;
