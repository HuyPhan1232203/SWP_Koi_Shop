import React from "react";
import { Form, Input, Radio } from "antd";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";

function ManageStaff() {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "bornYear",
      dataIndex: "bornYear",
      key: "bornYear",
    },
    {
      title: "size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "breed",
      dataIndex: "breed",
      key: "breed",
    },

    {
      title: "origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const formItems = (
    <>
      <Form.Item
        hidden
        label="id"
        rules={[{ required: true, message: "Please Input" }]}
        name="id"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Name"
        rules={[{ required: true, message: "Please Input" }]}
        name="name"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="price"
        rules={[
          { required: true, message: "Please Input" },
          // { min: 1000, message: "Price cannot lower than 1000" },
        ]}
        name="price"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="vendor"
        rules={[{ required: true, message: "Please Input" }]}
        name="vendor"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="gender"
        rules={[{ required: true, message: "Please Input" }]}
        name="gender"
      >
        <Radio.Group name="radiogroup">
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="bornYear"
        rules={[{ required: true, message: "Please Input" }]}
        name="bornYear"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="breed"
        rules={[{ required: true, message: "Please Input" }]}
        name="breed"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="description"
        rules={[{ required: true, message: "Please Input" }]}
        name="description"
      >
        <Input></Input>
      </Form.Item>

      <Form.Item
        label="origin"
        rules={[{ required: true, message: "Please Input" }]}
        name="origin"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="size"
        rules={[
          { required: true, message: "Please Input" },
          {
            type: "number",
            message: "Invalid Input",
          },
        ]}
        name="size"
      >
        <Input.Number></Input.Number>
      </Form.Item>
    </>
  );
  return (
    <div>
      <CRUDTemplate columns={columns} formItems={formItems} apiName="koi" />
    </div>
  );
}

export default ManageStaff;
