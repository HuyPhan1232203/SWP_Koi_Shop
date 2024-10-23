import { Button, DatePicker, Form, Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import "./showConsign-online.css";

function ShowConsignOnl() {
  const [form] = Form.useForm();
  const user = useSelector((store) => store.user);
  const KoiSubmit = useSelector((store) => store.koi);
  console.log(KoiSubmit);
  const handleSubmitConsign = async (Koi) => {
    console.log(Koi);
    const response = await api.post("consignment", {
      type: "ONLINE",
      startDate: Koi.startDate,
      description: Koi.description,
      careTypeId: 2,
      consignmentDetailRequests: [
        {
          koiRequest: {
            name: Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.name,
            price: Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.price,
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
            imagesList:
              Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.imagesList,
          },
        },
      ],
    });
    console.log(response.data);
    window.open(response.data);
  };

  return (
    <div className="form-deposit">
      <h2>More Info</h2>
      <Form
        labelCol={{ span: 24 }}
        className="more-info"
        form={form}
        onFinish={handleSubmitConsign}
      >
        <Form.Item label="Start date" name="startDate">
          <DatePicker />
        </Form.Item>
        <Form.Item
          initialValue={[{ koiRequest: { KoiSubmit } }]}
          label="Address"
          name="consignmentDetailRequests"
          hidden
        ></Form.Item>
        <Form.Item label="Description:" name="description">
          <TextArea></TextArea>
        </Form.Item>
        <Button className="info-button" onClick={form.submit}>
          Continue
        </Button>
      </Form>
    </div>
  );
}

export default ShowConsignOnl;
