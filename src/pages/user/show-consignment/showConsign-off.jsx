import { Button, DatePicker, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import TextArea from "antd/es/input/TextArea";

function ShowConsignOff() {
  const [careType, setCareType] = useState([]);
  //FETCH
  const fetchCareType = async () => {
    const response = await api.get("caretypes");
    console.log(response.data);
    setCareType(response.data);
  };
  useEffect(() => {
    fetchCareType();
  }, []);
  return (
    <div>
      <Form>
        <Form.Item label="Address" name="address">
          <Input></Input>
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Form.Item label="Start date" name="startDate">
            <DatePicker />
          </Form.Item>
          <Form.Item label="End date" name="endDate">
            <DatePicker />
          </Form.Item>
        </div>
        <div className="shipping">
          <Form.Item
            name="ship"
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
          <Form.Item label="Description:">
            <TextArea></TextArea>
          </Form.Item>
        </div>
      </Form>
      <Button>Continue</Button>
    </div>
  );
}

export default ShowConsignOff;
