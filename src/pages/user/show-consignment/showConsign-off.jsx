import { Button, DatePicker, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import "./showConsign-off.css";

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
    // Koi.type = "OFFLINE";
    console.log(Koi);
    const response = await api.post("consignment", {
      type: "OFFLINE",
      address: Koi.address,
      startDate: Koi.startDate,
      endDate: Koi.endDate,
      description: Koi.description,
      careTypeId: Koi.careTypeId,
      consignmentDetailRequests: [
        {
          koiRequest: {
            gender:
              Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.gender,
            bornYear:
              Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.bornYear,
            size: Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.size,
            breedId:
              Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.breedId,
            origin:
              Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.origin,
            description:
              Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.description,
            quantity:
              Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.quantity,
            imageUrl:
              Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.imageUrl,
            imagesList: [
              {
                image: "string",
              },
            ],
          },
        },
      ],
    });
    console.log(response.data);
    window.open(response.data);
  };

  useEffect(() => {
    fetchCareType();
  }, []);
  return (
    <div className="form-off">
      <h2>More Info</h2>
      <Form
        className="more-info-form"
        form={form}
        onFinish={handleCheckOut}
        labelCol={{ span: 24 }}
      >
        <Form.Item className="address-form" label="Address" name="address">
          <Input></Input>
        </Form.Item>
        <Form.Item
          initialValue={[{ koiRequest: { KoiSubmit } }]}
          label="Address"
          name="consignmentDetailRequests"
          hidden
        ></Form.Item>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Form.Item
            labelCol={{ span: 9 }}
            className="date-form"
            label="Start date"
            name="startDate"
          >
            <DatePicker className="date-form-2" />
          </Form.Item>
          <Form.Item labelCol={{ span: 9 }} label="End date" name="endDate">
            <DatePicker />
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
        <Button className="info-btn" htmlType="submit">
          Continue
        </Button>
      </Form>
    </div>
  );
}

export default ShowConsignOff;
