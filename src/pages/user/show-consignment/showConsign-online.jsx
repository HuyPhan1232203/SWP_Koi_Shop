import { Button, DatePicker, Form, Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useSelector } from "react-redux";

function ShowConsignOnl() {
  const [form] = Form.useForm();
  const user = useSelector((store) => store.user);
  const handleSubmitConsign = async (Koi) => {
    const response = await api.postForm("consignment/", Koi);
    console.log(response.data);
  };

  return (
    <div>
      <Form form={form} onFinish={handleSubmitConsign}>
        <Form.Item label="Address" name="address" initialValue={user.address}>
          <Input defaultValue={user.address}></Input>
        </Form.Item>
        <Form.Item label="Start date" name="startDate">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Description:">
          <TextArea></TextArea>
        </Form.Item>
      </Form>
      <Button onClick={form.submit}>Continue</Button>
    </div>
  );
}

export default ShowConsignOnl;
