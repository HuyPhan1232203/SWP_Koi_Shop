import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Radio,
  Table,
  Upload,
} from "antd";
// import "./ManagementKoi.css";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/file";
import api from "../../../config/axios";
const ManagementKoi = () => {
  const [KoiFish, setKoiFish] = useState([]);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const fetchKoi = async () => {
    const response = await api.get("koi");
    setKoiFish(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    fetchKoi();
  }, []);
  const [formStand] = useForm();
  const [submitKoi, setSubmitKoi] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleClosenModal = () => {
    setOpenModal(false);
  };
  const cols = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <Image src={image} alt="" width={200} />;
      },
    },
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
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "bornYear",
      dataIndex: "bornYear",
      key: "bornYear",
    },
    {
      title: "size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "breed",
      dataIndex: "breed",
      key: "breed",
    },

    {
      title: "origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, koi) => {
        return (
          <div style={{ display: "flex" }}>
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
    if (fileList.length > 0) {
      const file = fileList[0];
      console.log(file);
      const url = await uploadFile(file.originFileObj);
      Koi.image = url;
    }
    try {
      setSubmitKoi(true);
      if (Koi.id) {
        //update
        const response = await api.put(`koi/${Koi.id}`, Koi);
        console.log(response);
      } else {
        //create
        await api.post("koi", Koi);
      }
      fetchKoi();
      toast.success("Update successfully!!!");
      formStand.resetFields();
      handleClosenModal();
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitKoi(false);
    }
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  return (
    <div>
      <div className="header text-center p-5 ">
        <h1 className="header_text">Koi Management</h1>
      </div>
      <Button className="add_btn" onClick={handleOpenModal}>
        Create Koi
      </Button>
      <Modal
        confirmLoading={submitKoi}
        title={<span className="Modal_header">KOI INFORMATION</span>}
        open={openModal}
        onCancel={handleClosenModal}
        onOk={() => {
          formStand.submit();
        }}
      >
        <Form onFinish={handleSubmitKoi} form={formStand}>
          <Form.Item
            hidden
            label="id"
            rules={[{ required: true, message: "Please Input" }]}
            name="id"
          >
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
            label="price"
            rules={[
              { required: true, message: "Please Input" },
              // { min: 1000, message: "Price cannot lower than 1000" },
            ]}
            name="price"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="vendor"
            rules={[{ required: true, message: "Please Input" }]}
            name="vendor"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="gender"
            rules={[{ required: true, message: "Please Input" }]}
            name="gender"
          >
            <Radio.Group name="radiogroup">
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="bornYear"
            rules={[{ required: true, message: "Please Input" }]}
            name="bornYear"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="breed"
            rules={[{ required: true, message: "Please Input" }]}
            name="breed"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="description"
            rules={[{ required: true, message: "Please Input" }]}
            name="description"
          >
            <Input></Input>
          </Form.Item>

          <Form.Item
            label="origin"
            rules={[{ required: true, message: "Please Input" }]}
            name="origin"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="size"
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
          <Form.Item label="Image" name="image">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <Table columns={cols} dataSource={KoiFish}></Table>
    </div>
  );
};
export default ManagementKoi;
