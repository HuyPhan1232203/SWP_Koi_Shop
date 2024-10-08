import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";

const CRUDTemplate = ({ columns, formItems, apiName, name, role }) => {
  const [KoiFish, setKoiFish] = useState([]);
  const [formStand] = Form.useForm();
  const [submitKoi, setSubmitKoi] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  //FETCH
  const fetchKoi = async () => {
    const response = await api.get(apiName);
    setKoiFish(response.data);
  };

  //USE EFFECT
  useEffect(() => {
    fetchKoi();
  }, []);
  //OPEN MODAL
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  //CLOSE MODEL
  const handleClosenModal = () => {
    setOpenModal(false);
  };
  //COLUMNS
  const cols = [
    ...columns,
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, koi) => {
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
                formStand.setFieldsValue(koi);
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
          </div>
        );
      },
    },
  ];
  //DELETE
  const handleDeleteKoi = async (id) => {
    try {
      console.log(id);
      const response = await api.delete(`${apiName}/${id}`);
      console.log(response);
      toast.success("Deleteted successfully!!!");
      fetchKoi();
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  //CREATE OR UPDATE
  const handleSubmitKoi = async (Koi) => {
    try {
      setSubmitKoi(true);
      let response = null;
      if (Koi.id) {
        //update
        response = await api.put(`${apiName}/${Koi.id}`, Koi);
        console.log(response);
      } else {
        //create
        response = await api.post(`${apiName}`, Koi);
        console.log(response);
      }
      fetchKoi();
      toast.success("Update successfully!!!");
      formStand.resetFields();
      handleClosenModal();
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data); // Better error handling
      } else {
        console.log("An unexpected error occurred", err);
      }
    } finally {
      setSubmitKoi(false);
    }
  };
  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  return (
    <div>
      <div className="header text-center p-5 ">
        <h1 className="header_text" style={{ color: "#E35C40" }}>
          {name} Management
        </h1>
      </div>
      <div className="sub_header">
        <Button className="add_btn" onClick={handleOpenModal}>
          Create {name}
        </Button>
        <Input
          placeholder="search"
          style={{ width: "300px", marginLeft: "900px" }}
        ></Input>
      </div>
      <Modal
        confirmLoading={submitKoi}
        title={<span className="Modal_header">{name} Information</span>}
        open={openModal}
        onCancel={() => {
          handleClosenModal();
          formStand.resetFields();
        }}
        onOk={formStand.submit}
      >
        <Form onFinish={handleSubmitKoi} form={formStand}>
          <Form.Item hidden label="id" name="id">
            <Input></Input>
          </Form.Item>
          {formItems}
        </Form>
      </Modal>
      <Table columns={cols} dataSource={KoiFish}></Table>
    </div>
  );
};
export default CRUDTemplate;
