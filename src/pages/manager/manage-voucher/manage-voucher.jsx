import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function ManageVoucher() {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  //GET
  const fetchData = async () => {
    try {
      const response = await api.get("voucher");
      setDatas(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  //CREATE or UPDATE
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      if (values.id) {
        // => update
        const response = await api.put(`voucher/${values.id}`, values);
      } else {
        // => create
        const response = await api.post("voucher", values);
      }
      toast.success("Successfully saved!");
      fetchData();
      form.resetFields();
      setShowModal(false);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  //DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`voucher/${id}`);
      toast.success("Successfully deleted!");
      fetchData();
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldsValue(category);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            onConfirm={() => {
              handleDeleteKoi(id);
            }}
            title="Delete"
            description="Are you sure"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add</Button>
      <Table dataSource={datas} columns={columns} />

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        title="Voucher"
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="startAt"
            label="Start At"
            rules={[{ required: true, message: "Please input started day" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="endAt"
            label="End At"
            rules={[{ required: true, message: "Please input ended day" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="createAt"
            label="Create At"
            rules={[{ required: true, message: "Please input created day" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageVoucher;
