import { Button, DatePicker, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";

function ShowConsignOff() {
  const [form] = Form.useForm();
  const [careType, setCareType] = useState([]);
  const KoiSubmit = useSelector((store) => store.koi);
  //FETCH
  const fetchCareType = async () => {
    const response = await api.get("caretypes");
    console.log(response.data);
    setCareType(response.data);
  };
  const handleCheckOut = async (Koi) => {
    Koi.type = "OFFLINE";
    console.log(Koi);
    const response = await api.post("consignment/", Koi);
    console.log(response.data);
  };
  useEffect(() => {
    fetchCareType();
  }, []);
  return (
    <div>
      <Form form={form} onFinish={handleCheckOut}>
        <Form.Item label="Address" name="address">
          <Input></Input>
        </Form.Item>
        <Form.Item
          initialValue={[{ koiRequest: { KoiSubmit } }]}
          label="Address"
          name="consignmentDetailRequests"
          hidden
        ></Form.Item>
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
          <Form.Item label="Description:" name="description">
            <TextArea></TextArea>
          </Form.Item>
        </div>
        <Button htmlType="submit">Continue</Button>
      </Form>
    </div>
  );
}

export default ShowConsignOff;
