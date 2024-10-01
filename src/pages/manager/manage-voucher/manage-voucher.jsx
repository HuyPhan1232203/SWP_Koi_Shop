import React from "react";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";
import { Form, Input } from "antd";

function ManageVoucher() {
  const columns = [
    {
      title: "Expired Date",
      dataIndex: "expiredDate",
      key: "expiredDate",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const formItems = (
    <>
      <Form.Item
        label="Expired Date"
        rules={[{ required: true, message: "Please Input Expired Date!" }]}
        name="expiredDate"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="Description"
        rules={[{ required: true, message: "Please Input Description!" }]}
        name="description"
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
      <CRUDTemplate columns={columns} formItems={formItems} path="voucher" />
    </div>
  );
}

export default ManageVoucher;
