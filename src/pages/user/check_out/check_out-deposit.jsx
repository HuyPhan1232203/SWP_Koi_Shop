import { Button, Form, Input } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";

function CheckOutConsignment() {
  const userInfo = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.selectedItems);
  const handelSubmitOrder = async () => {
    try {
      const selectedItems = cartItems;
      const detail = selectedItems.map((item) => ({
        koiId: item.id,
        price: item.price,
      }));
      console.log({ detail });
      const response = await api.post("order", { detail });
      console.log(response.data);
      window.open(response.data, "_blank", "noopener,noreferrer");
    } catch (err) {
      toast.error("err");
    }
  };
  return (
    <Form labelCol={{ span: 24 }} className="userInfo_input">
      <div className="user_info_contain">
        <Form.Item
          initialValue={userInfo.username}
          name="name"
          rules={[
            {
              required: true,
              message: "Please Input",
            },
          ]}
          label="Username"
          className="userInfo_input_field"
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          initialValue={userInfo.phone}
          name="phone"
          rules={[
            {
              required: true,
              message: "Please Input",
            },
          ]}
          label="Phone"
          className="userInfo_input_field"
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          initialValue={userInfo.email}
          name="email"
          rules={[
            {
              required: true,
              message: "Please Input",
            },
          ]}
          label="Email"
          className="userInfo_input_field"
        >
          <Input></Input>
        </Form.Item>
      </div>
      <div className="message">
        <Form.Item name="message" label="Message to shop">
          <TextArea rows={4}></TextArea>
        </Form.Item>
      </div>
      <Button htmlType="submit">Continue</Button>
    </Form>
  );
}

export default CheckOutConsignment;
