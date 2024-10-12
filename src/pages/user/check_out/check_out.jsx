import React from "react";
import { useSelector } from "react-redux";
import "./check_out.css";
import { Form, Input } from "antd";
function CheckOut() {
  const form = Form.useForm();
  const userInfo = useSelector((store) => store.user);
  console.log(userInfo);
  return (
    <div className="CheckOut row">
      <div className="col-md-8 userInfo">
        <h1>Check Out</h1>
        <div>
          <Form labelCol={{ span: 24 }} className="userInfo_input">
            <Form.Item label="Username" className="userInfo_input_field">
              <Input defaultValue={userInfo.username}></Input>
            </Form.Item>
            <Form.Item label="Phone" className="userInfo_input_field">
              <Input defaultValue={userInfo.phone}></Input>
            </Form.Item>
            <Form.Item label="Email" className="userInfo_input_field">
              <Input defaultValue={userInfo.email}></Input>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="col-md-4 sumary">
        <h1>aldsjnd</h1>
      </div>
    </div>
  );
}

export default CheckOut;
