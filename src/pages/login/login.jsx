import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Authen_template from "../../conponent/authen_template/authen_template";
import { Button, Form, Input } from "antd";
import "./login.css";
import { provider } from "../../config/firebase";
import { Link } from "react-router-dom";
function LoginPage() {
  const handleLogin = () => {};
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
      >
        <Form.Item
          label="Username"
          name="txtUsername"
          rules={[
            {
              required: true,
              message: "Please enter your username",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="Password"
          name="txtPassword"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password></Input.Password>
        </Form.Item>
        <div className="button_container">
          <Button>Login</Button>
          <Button onClick={handleLoginWithEmail}>Login Google</Button>
        </div>
        <Link to="/register" className="register">
          register
        </Link>
      </Form>
    </Authen_template>
  );
}

export default LoginPage;
