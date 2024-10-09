import React from "react";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";
import { Form, Input, Radio } from "antd";

function ManageKoiLot() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Breed Id",
      dataIndex: "breedId",
      key: "breedId",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Born Year",
      dataIndex: "bornYear",
      key: "bornYear",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
    },
  ];

  const formItems = (
    <>
      <Form.Item
        label="Name"
        rules={[{ required: true, message: "Please Input Breed's Name" }]}
        name="name"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Breed ID"
        rules={[{ required: true, message: "Please Input Breed's ID" }]}
        name="breedId"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Price"
        rules={[{ required: true, message: "Please Input Price" }]}
        name="Price"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Vendor"
        rules={[{ required: true, message: "Please Input Vendor" }]}
        name="vendor"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Gender"
        rules={[{ required: true, message: "Please Input Gender" }]}
        name="gender"
      >
        <Radio.Group name="radiogroup">
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Born Year"
        rules={[{ required: true, message: "Please Input Born Year" }]}
        name="bornYear"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Size"
        rules={[{ required: true, message: "Please Input Size" }]}
        name="size"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Origin"
        rules={[{ required: true, message: "Please Input Origin" }]}
        name="origin"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Description"
        rules={[{ required: true, message: "Please Input Description" }]}
        name="description"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Quantity"
        rules={[{ required: true, message: "Please Input Quantity" }]}
        name="quantity"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Images"
        rules={[{ required: true, message: "Please Input Images" }]}
        name="images"
      >
        <Input></Input>
      </Form.Item>
    </>
  );
  return (
    <div>
      <CRUDTemplate
        columns={columns}
        formItems={formItems}
        name="Koi Lot"
        apiName="koilot"
      />
    </div>
  );
}

export default ManageKoiLot;
