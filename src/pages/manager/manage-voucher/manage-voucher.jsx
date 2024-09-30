import React from "react";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";
import { Form, Input } from "antd";

function ManageVoucher() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Start At",
      dataIndex: "startAt",
      key: "startAt",
    },
    {
      title: "End At",
      dataIndex: "endAt",
      key: "endAt",
    },
    {
      title: "Create At",
      dataIndex: "createAt",
      key: "createAt",
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
        label="Start At"
        rules={[{ required: true, message: "Please Input Started Day" }]}
        name="startAt"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="End At"
        rules={[{ required: true, message: "Please Input Ended day" }]}
        name="endAt"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Create At"
        rules={[{ required: true, message: "Please Input Created Day" }]}
        name="createAt"
      >
        <Input></Input>
      </Form.Item>
    </>
  );
  return (
    <div>
      <div>
        <h1>Voucher Management</h1>
      </div>
      <CRUDTemplate columns={columns} formItems={formItems} />
    </div>
  );
}

export default ManageVoucher;
