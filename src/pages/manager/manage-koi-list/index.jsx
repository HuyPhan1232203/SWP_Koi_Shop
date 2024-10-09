import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Radio,
  Select,
  Table,
  Upload,
} from "antd";
// import "./ManagementKoi.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { Option } from "antd/es/mentions";
const ManagementKoi = () => {
  const [KoiFish, setKoiFish] = useState([]);
  const [formStand] = Form.useForm();
  const [submitKoi, setSubmitKoi] = useState(false);
  const [submitBreed, setSubmitBreed] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  //FETCH
  const fetchKoi = async () => {
    try {
      const response = await api.get("koi?page=0&size=20");
      setKoiFish(response.data.content);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const fetchBreed = async () => {
    try {
      const response = await api.get("breed");
      setSubmitBreed(response.data);
      console.log(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  //USE EFFECT
  useEffect(() => {
    fetchKoi();
    fetchBreed();
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
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (image) => {
    //     return <Image src={image} alt="" width={200} />;
    //   },
    // },
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Born Year",
      dataIndex: "bornYear",
      key: "bornYear",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Breed",
      dataIndex: "breedName",
      key: "breedName",
    },

    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      await api.delete(`koi/${id}`);
      toast.success("Deleteted successfully!!!");
      fetchKoi();
    } catch (err) {
      toast.error(err);
    }
  };
  //CREATE OR UPDATE
  const handleSubmitKoi = async (Koi) => {
    try {
      setSubmitKoi(true);
      if (Koi.id) {
        //update
        const response = await api.put(`koi/${Koi.id}`, Koi);
        console.log(response);
      } else {
        //create
        const response = await api.post("koi", Koi);
        console.log(Koi);
      }
      fetchKoi();
      toast.success("Update successfully!!!");
      formStand.resetFields();
      handleClosenModal();
    } catch (err) {
      console.log("error");
    } finally {
      setSubmitKoi(false);
    }
  };
  //SHOW BREED LIST
  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  return (
    <div>
      <div className="header text-center p-5 ">
        <h1 className="header_text" style={{ color: "#FE7A36" }}>
          Koi Management
        </h1>
      </div>
      <Button className="add_btn" onClick={handleOpenModal}>
        Create Koi
      </Button>
      <Modal
        confirmLoading={submitKoi}
        title={<span className="Modal_header">KOI INFORMATION</span>}
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
          <Form.Item hidden label="ID" name="id">
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Name"
            rules={[{ required: true, message: "Please Input" }]}
            name="name"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Price"
            rules={[
              { required: true, message: "Please Input" },
              // { min: 1000, message: "Price cannot lower than 1000" },
            ]}
            name="price"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Vendor"
            rules={[{ required: true, message: "Please Input" }]}
            name="vendor"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Born Year"
            rules={[{ required: true, message: "Please Input" }]}
            name="bornYear"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item label="Breed Name" name="breedId">
            <Select>
              {submitBreed.map((breed) => (
                <Select.Option key={breed.name} breed={breed} value={breed.id}>
                  {breed.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Description"
            rules={[{ required: true, message: "Please Input" }]}
            name="description"
          >
            <Input></Input>
          </Form.Item>

          <Form.Item
            label="Origin"
            rules={[{ required: true, message: "Please Input" }]}
            name="origin"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Gender"
            rules={[{ required: true, message: "Please Input" }]}
            name="gender"
          >
            <Radio.Group name="radiogroup">
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Size"
            rules={[
              { required: true, message: "Please Input" },
              {
                type: "number",
                message: "Invalid Input",
              },
            ]}
            name="size"
          >
            <InputNumber></InputNumber>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={cols} dataSource={KoiFish}></Table>
    </div>
  );
};
export default ManagementKoi;
