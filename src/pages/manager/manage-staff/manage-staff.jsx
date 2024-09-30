import React from "react";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";
import { Form, Input } from "antd";

function ManageStaff() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
  ];

  const formItems = (
    <>
      <Form.Item
        label="ID"
        rules={[{ required: true, message: "Please Input Staff's ID" }]}
        name="id"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Name"
        rules={[{ required: true, message: "Please Input Staff's Name" }]}
        name="name"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Position"
        rules={[{ required: true, message: "Please Input Staff's Position" }]}
        name="position"
      >
        <Input></Input>
      </Form.Item>
    </>
  );
  return (
    <div>
      <CRUDTemplate columns={columns} formItems={formItems} />
    </div>
  );
}

export default ManageStaff;
