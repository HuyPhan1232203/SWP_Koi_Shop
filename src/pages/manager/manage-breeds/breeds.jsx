import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Table,
  Upload,
} from "antd";
// import "./ManagementKoi.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import uploadFile from "../../../utils/file";
import { PlusOutlined } from "@ant-design/icons";
const ManagementKoi = () => {
  const [formStand] = Form.useForm();
  const [submitKoi, setSubmitKoi] = useState(false);
  const [submitBreed, setSubmitBreed] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  //FETCH

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
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };
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
  //COLUMNS
  const cols = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => {
        return <Image src={imageUrl} alt="" width={200} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
                formStand.setFieldsValue({
                  ...koi,
                  imageUrl: koi.imageUrl
                    ? { file: { url: koi.imageUrl } }
                    : null,
                });
                setFileList(
                  koi.imageUrl
                    ? [
                        {
                          uid: "-1",
                          name: "image.png",
                          status: "done",
                          url: koi.imageUrl,
                        },
                      ]
                    : []
                );
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
      await api.delete(`breed/${id}`);
      toast.success("Deleteted successfully!!!");
      fetchBreed();
    } catch (err) {
      toast.error(err);
    }
  };
  //CREATE OR UPDATE
  const handleSubmitKoi = async (Koi) => {
    try {
      setSubmitKoi(true);
      if (!Koi.imageUrl.file.url) {
        Koi.imageUrl = await uploadFile(Koi.imageUrl.file.originFileObj);
      } else {
        Koi.imageUrl = Koi.imageUrl.file.url;
      }
      //convert Object to string img
      console.log(Koi.imageUrl);
      if (Koi.id) {
        //update
        console.log("update");
        const res = await api.put(`breed/${Koi.id}`, Koi);
        console.log(res.data);
        setFileList([]);
      } else {
        //create
        await api.post(`breed`, Koi);
        setFileList([]);
      }
      fetchBreed();
      toast.success("Successfully!!!");
      formStand.resetFields();
      handleClosenModal();
    } catch (err) {
      toast.error(err);
    } finally {
      setSubmitKoi(false);
    }
  };
  //SHOW BREED LIST
  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  return (
    <div>
      <div className="header text-center p-5 ">
        <h1 className="header_text" style={{ color: "#000" }}>
          Breed Management
        </h1>
      </div>
      <Button className="add_btn" onClick={handleOpenModal}>
        Create Breed
      </Button>
      <Modal
        confirmLoading={submitKoi}
        title={<span className="Modal_header">BREED INFORMATION</span>}
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
          <Form.Item label="imageUrl" name="imageUrl">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length < 1 ? uploadButton : null}
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
      <Table columns={cols} dataSource={submitBreed}></Table>
    </div>
  );
};
export default ManagementKoi;
