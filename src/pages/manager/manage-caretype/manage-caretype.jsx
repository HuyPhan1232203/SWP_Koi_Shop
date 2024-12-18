import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/axios";

function ManageCareType() {
  const [submitCareType, setSubmitCareType] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchCareType = async () => {
    try {
      const response = await api.get("caretypes/manager");
      setSubmitCareType(response.data);
      console.log(response.data);
    } catch (err) {
      toast.error(err.response);
    }
  };

  useEffect(() => {
    fetchCareType();
  }, []);

  //OPEN MODAL
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  //CLOSE MODEL
  const handleClosenModal = () => {
    setOpenModal(false);
  };

  const handleSubmitCareType = async (caretypes) => {
    try {
      console.log(caretypes);
      setLoading(true);
      if (caretypes.id) {
        //update
        await api.put(`caretypes/${caretypes.id}`, caretypes);
      } else {
        //create
        await api.post(`caretypes`, caretypes);
      }
      fetchCareType();
      toast.success("Update successfully!!!");
      form.resetFields();
      handleClosenModal();
    } catch (err) {
      toast.error("err");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCareType = async (id) => {
    try {
      await api.delete(`caretypes/${id}`);
      toast.success("Deleteted successfully!!!");
      fetchCareType();
    } catch (err) {
      toast.error(err);
    }
  };

  const cols = [
    {
      title: "ID",
      dataIndex: "careTypeId",
      key: "careTypeId",
    },
    {
      title: "Care Type",
      dataIndex: "careTypeName",
      key: "careTypeName",
    },
    {
      title: "Cost Per Day",
      dataIndex: "costPerDay",
      key: "costPerDay",
    },
    {
      title: "Action",
      dataIndex: "careTypeId",
      key: "careTypeId",
      render: (careTypeId, caretypes) => {
        return (
          <div
            style={{
              display: "flex",
              width: "150px",
              justifyContent: "space-around",
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                setOpenModal(true);
                form.setFieldsValue(caretypes);
              }}
            >
              Edit
            </Button>

            <Popconfirm
              onConfirm={() => {
                handleDeleteCareType(careTypeId);
              }}
              title="Delete"
              description="Are you sure"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="header text-center p-5 ">
        <h1 className="header_text" style={{ color: "#000" }}>
          Care Type Management
        </h1>
      </div>
      <Button className="add_btn" onClick={handleOpenModal}>
        Create Care Type
      </Button>
      <Modal
        confirmLoading={loading}
        title={<span className="Modal_header">CARE TYPE INFORMATION</span>}
        open={openModal}
        onCancel={() => {
          handleClosenModal();
          form.resetFields();
        }}
        onOk={form.submit}
      >
        <Form
          labelCol={{ span: 7 }}
          onFinish={handleSubmitCareType}
          form={form}
        >
          <Form.Item
            name="careTypeName"
            label="Care Type"
            rules={[{ required: true, message: "Please Input" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="costPerDay"
            label="Cost Per Day"
            rules={[{ required: true, message: "Please Input" }]}
          >
            <InputNumber></InputNumber>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={cols} dataSource={submitCareType} />
    </div>
  );
}

export default ManageCareType;
