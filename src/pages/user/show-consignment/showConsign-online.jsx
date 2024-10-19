import { Button, DatePicker, Form, Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useSelector } from "react-redux";


function ShowConsignOnl() {
  const [form] = Form.useForm();
  const user = useSelector((store) => store.user);
  const KoiSubmit = useSelector((store) => store.koi);
  const handleSubmitConsign = async (Koi) => {
    console.log(Koi);
    const response = await api.post("consignment/", {
      type: "ONLINE",
      startDate: Koi.startDate,
      description: Koi.description,
      careTypeId: 3,
      consignmentDetailRequests: [
        {
          koiRequest: {
            name:
              Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.name,
            price:
              Koi.consignmentDetailRequests[0].koiRequest.KoiSubmit.price,
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
          },
        },
      ],
    });
    console.log(response.data);
  };


  return (
    <div>
      <Form form={form} onFinish={handleSubmitConsign}>
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
        <Button onClick={form.submit}>Continue</Button>
      </Form>
    </div>
  );
}


export default ShowConsignOnl;



