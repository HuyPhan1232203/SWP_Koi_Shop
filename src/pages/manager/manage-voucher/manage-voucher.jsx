import React from "react";
import { Form, Input, InputNumber } from "antd";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";

function ManageVoucher() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Discount Value",
      dataIndex: "discountValue",
      key: "discountValue",
    },
    {
      title: "Expired Date",
      dataIndex: "expiredDate",
      key: "expiredDate",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Minimum Points",
      dataIndex: "minimumPoints",
      key: "minimumPoints",
    },
    {
      title: "Minimum Price",
      dataIndex: "minimumPrice",
      key: "minimumPrice",
    },
  ];

  const formItems = (
    <>
      <Form.Item
        label="discountValue"
        rules={[{ required: true, message: "Please Input Discount Value" }]}
        name="discountValue"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="expiredDate"
        rules={[{ required: true, message: "Please Input Expired Date" }]}
        name="expiredDate"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="quantity"
        rules={[{ required: true, message: "Please Input Quantity" }]}
        name="quantity"
      >
        <InputNumber></InputNumber>
      </Form.Item>
      <Form.Item
        label="description"
        rules={[{ required: true, message: "Please Input Description" }]}
        name="description"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="minimumPoints"
        rules={[{ required: true, message: "Please Input Minimum Points" }]}
        name="minimumPoints"
      >
        <InputNumber></InputNumber>
      </Form.Item>
      <Form.Item
        label="minimumPrice"
        rules={[{ required: true, message: "Please Input Minimum Price" }]}
        name="minimumPrice"
      >
        <InputNumber></InputNumber>
      </Form.Item>
    </>
  );
  return (
    <div>
      <CRUDTemplate
        columns={columns}
        formItems={formItems}
        apiName="voucher"
        name="Voucher"
      />
    </div>
  );
}

export default ManageVoucher;
