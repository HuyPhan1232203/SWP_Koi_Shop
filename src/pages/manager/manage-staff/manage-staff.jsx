import { Form, Input, InputNumber, Radio } from "antd";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";
function ManageStaff() {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const formItems = (
    <>
      <Form.Item hidden label="id" name="id">
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="email"
        rules={[{ required: true, message: "Please Input" }]}
        name="email"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="username"
        rules={[{ required: true, message: "Please Input" }]}
        name="username"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="phone"
        rules={[{ required: true, message: "Please Input" }]}
        name="phone"
      >
        <Input></Input>
      </Form.Item>

      <Form.Item hidden label="password" name="password">
        <Input></Input>
      </Form.Item>
    </>
  );
  return (
    <div>
      <CRUDTemplate
        columns={columns}
        formItems={formItems}
        apiName="account"
        name="Staff"
      />
    </div>
  );
}

export default ManageStaff;
