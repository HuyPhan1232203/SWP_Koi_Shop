import { Button, DatePicker, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import api from "../../../config/axios";

function CheckOutConsignment() {
  const userInfo = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.selectedItems);
  const [careType, setCareType] = useState([]);
  //FETCH Care
  const fetchCareType = async () => {
    const response = await api.get("caretypes");
    console.log(response.data);
    setCareType(response.data);
  };
  useEffect(() => {
    fetchCareType();
  }, []);
  const handelSubmitOrder = async (value) => {
    try {
      const selectedItems = cartItems;
      const detail = selectedItems.map((item) => ({
        koiId: item.id,
      }));
      const values = {
        detail: detail,
        describe: value.description,
        endDate: value.endDate,
        careTypeId: value.careTypeId,
      };
      console.log(values);
      const response = await api.post("consignmentOrder/", values);
      console.log(response.data);
      window.open(response.data);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <Form
      labelCol={{ span: 24 }}
      className="userInfo_input"
      onFinish={handelSubmitOrder}
    >
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
      <div className="shipping">
        <Form.Item
          className="care-form"
          name="careTypeId"
          rules={[
            {
              required: true,
              message: "Please Input",
            },
          ]}
          label="Care type:"
        >
          <Radio.Group name="radiogroup" className="radio_delivery">
            {careType.map((item) => {
              return (
                <Radio
                  key={item.careTypeId}
                  value={item.careTypeId}
                  className="delivery"
                >
                  <div className="delivery_item ">{item.careTypeName}</div>
                  <small>${item.costPerDay}/day</small>
                </Radio>
              );
            })}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          className="care-form"
          label="Description:"
          name="description"
        >
          <TextArea></TextArea>
        </Form.Item>
      </div>
      <Form.Item>
        <Form.Item labelCol={{ span: 9 }} label="End date" name="endDate">
          <DatePicker />
        </Form.Item>
      </Form.Item>
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
