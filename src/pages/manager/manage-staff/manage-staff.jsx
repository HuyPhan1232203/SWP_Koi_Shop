import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/axios";
const ManageStaff = () => {
  const [KoiFish, setKoiFish] = useState([]);
  const [formStand] = Form.useForm();
  const [submitKoi, setSubmitKoi] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState();

  //FETCH
  const fetchKoi = async () => {
    const response = await api.get("account?role=STAFF");
    console.log(response.data);
    console.log("ada");
    setKoiFish(response.data);
  };
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  //SEARCH
  const handleSearchByName = async () => {
    try {
      let response = null;
      if (searchValue) {
        response = await api.get(`account/name/${searchValue}`);
      } else {
        response = await api.get("account/role/STAFF");
      }
      setKoiFish(response.data);
    } catch (err) {
      toast.error(err);
    }
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
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
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
      await api.delete(`account/${id}`);
      toast.success("Deleteted successfully!!!");
      fetchKoi();
    } catch (err) {
      toast.error(err);
    }
  };
  //CREATE OR UPDATE
  const handleSubmitKoi = async (Koi) => {
    try {
      Koi.password = "dsaasd";
      Koi.role = "STAFF";
      setSubmitKoi(true);
      if (Koi.id) {
        //update
        const response = await api.put(`account/${Koi.id}`, Koi);
        console.log(response);
      } else {
        //create
        const response = await api.post("register", Koi);
        console.log(response);
      }
      fetchKoi();
      toast.success("Update successfully!!!");
      formStand.resetFields();
      handleClosenModal();
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setSubmitKoi(false);
    }
  };

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  return (
    <div>
      <div className="header text-center p-5 ">
        <h1 className="header_text" style={{ color: "#000" }}>
          Staff Management
        </h1>
      </div>
      <div className="sub_header">
        <Button className="add_btn" onClick={handleOpenModal}>
          Create Staff
        </Button>
        <Input
          placeholder="Search"
          style={{
            width: "300px",
            marginLeft: "580px",
            border: "1px #000 solid",
          }}
          value={searchValue}
          onChange={handleInputChange}
        ></Input>
        <Button onClick={handleSearchByName()}>Search</Button>
      </div>
      <Modal
        confirmLoading={submitKoi}
        title={<span className="Modal_header">Staff Information</span>}
        open={openModal}
        onCancel={() => {
          handleClosenModal();
          formStand.resetFields();
        }}
        onOk={formStand.submit}
      >
        <Form
          labelCol={{ span: 5 }}
          onFinish={handleSubmitKoi}
          form={formStand}
        >
          <Form.Item hidden label="id" name="id">
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Email"
            rules={[{ required: true, message: "Please Input" }]}
            name="email"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Username"
            rules={[
              { required: true, message: "Please Input" },
              // { min: 1000, message: "username cannot lower than 1000" },
            ]}
            name="username"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Phone"
            rules={[{ required: true, message: "Please Input" }]}
            name="phone"
          >
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal>

      <Table columns={cols} dataSource={KoiFish}></Table>
    </div>
  );
};
export default ManageStaff;
