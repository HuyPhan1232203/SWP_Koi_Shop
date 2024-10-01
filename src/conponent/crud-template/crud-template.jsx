import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
// import api from "../../../config/axios";

function CRUDTemplate({ columns, formItems, apiName }) {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const tableColumn = [
    ...columns,
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, apiName) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(true);
              form.setFieldsValue({ apiName });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="sure?"
            onConfirm={() => {
              handleDelete(id);
            }}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  //   const column = [
  //     {
  //       title: "ID",
  //       dataIndex: "id",
  //       key: "id",
  //     },
  //     {
  //       title: "name",
  //       dataIndex: "name",
  //       key: "name",
  //     },
  //     {
  //       title: "description",
  //       dataIndex: "description",
  //       key: "description",
  //     },
  //     {
  //       title: "Action",
  //       dataIndex: "id",
  //       key: "id",
  //       render: (id, apiName) => (
  //         <>
  //           <Button
  //             type="primary"
  //             onClick={() => {
  //               setShowModal(true);
  //               form.setFieldsValue({ apiName });
  //             }}
  //           >
  //             Edit
  //           </Button>
  //           <Popconfirm
  //             title="Delete"
  //             description="sure?"
  //             onConfirm={() => {
  //               handleDelete(id);
  //             }}
  //           >
  //             <Button type="primary" danger>
  //               Delete
  //             </Button>
  //           </Popconfirm>
  //         </>
  //       ),
  //     },
  //   ];
  //GET
  const fetchData = async () => {
    try {
      const response = await api.get(apiName);
      setDatas(response.data);
    } catch (err) {
      toast.error(err);
    }
  };
  //CREATE OR UPDATE
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (values.id) {
        //update
        await api.put(`${apiName}/${values.id}`, values);
      } else {
        //create
        await api.post(apiName, values);
      }

      console.log(values);
      toast.success("success");

      fetchData();
      form.resetFields();
      setShowModal(false);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };
  //DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`${apiName}/${id}`);
      toast.success("Delete success");
      fetchData();
      form.resetFields();
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="text-center">Management</h1>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add
      </Button>
      <Table dataSource={datas} columns={tableColumn}></Table>
      <Modal
        confirmLoading={loading}
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
        title="add"
        onOk={form.submit}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          {formItems}
        </Form>
      </Modal>
    </div>
  );
}

export default CRUDTemplate;
