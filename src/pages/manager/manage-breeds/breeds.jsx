import React from "react";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";
import { Form, Input, message } from "antd";

function Breeds() {
  const col = [
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
  ];
  const formItems = (
    <Form.Item
      label="Name"
      rules={[{ require: true, message: "please input" }]}
      name="name"
    >
      <Input></Input>
    </Form.Item>
  );
  return (
    <div>
      <CRUDTemplate
        columns={col}
        formItems={formItems}
        apiName="breed"
        name="Breeds"
      />
    </div>
  );
}

export default Breeds;
