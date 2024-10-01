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
      title: "discountValue",
      dataIndex: "discountValue",
      key: "discountValue",
    },
    {
      title: "expiredDate",
      dataIndex: "expiredDate",
      key: "expiredDate",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "minimumPoints",
      dataIndex: "minimumPoints",
      key: "minimumPoints",
    },
    {
      title: "minimumPrice",
      dataIndex: "minimumPrice",
      key: "minimumPrice",
    },
  ];

  const formItems = (
    <>
      <Form.Item
        label="ID"
        rules={[{ required: true, message: "Please Input Voucher's ID" }]}
        name="id"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="discountValue"
        rules={[{ required: true, message: "Please Input Discount Value" }]}
        name="discountValue"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="expiredDate"
        rules={[{ required: true, message: "Please Input expiredDate" }]}
        name="expiredDate"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="quantity"
        rules={[{ required: true, message: "Please Input quantity" }]}
        name="quantity"
      >
        <InputNumber></InputNumber>
      </Form.Item>
      <Form.Item
        label="description"
        rules={[{ required: true, message: "Please Input description" }]}
        name="description"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="minimumPoints"
        rules={[{ required: true, message: "Please Input minimumPoints" }]}
        name="minimumPoints"
      >
        <InputNumber></InputNumber>
      </Form.Item>
      <Form.Item
        label="minimumPrice"
        rules={[{ required: true, message: "Please Input minimumPrice" }]}
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
