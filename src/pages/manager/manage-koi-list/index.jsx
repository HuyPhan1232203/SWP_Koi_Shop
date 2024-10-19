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
import uploadFile from "../../../utils/file";
import { PlusOutlined } from "@ant-design/icons";
const ManagementKoi = () => {
  const [KoiFish, setKoiFish] = useState([]);
  const [formStand] = Form.useForm();
  const [submitKoi, setSubmitKoi] = useState(false);
  const [submitBreed, setSubmitBreed] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [fileListArray, setFileListArray] = useState([]);
  //FETCH
  const fetchKoi = async () => {
    try {
      const response = await api.get("koi?page=0&size=20");
      console.log(response);
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
    console.log(
      KoiFish.map((koi) => {
        console.log(koi.certificate);
      })
    );
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
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleChangeList = ({ fileList: newFileList }) => setFileListArray(newFileList);

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
      dataIndex: "images",
      key: "images",
      render: (imageUrl) => {
        return <Image src={imageUrl} alt="" width={200} />;
      },
    },
    {
      title: "SubImage",
      dataIndex: "imagesList",
      key: "imagesList",
      render: (imageUrl) => {
        return imageUrl.map((img) => { return <Image key={img} src={img} width={100} height={150} ></Image> })
      },
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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Breed",
      dataIndex: "breeds",
      key: "breeds",
      render: (breed) => {
        return breed.map((item) => {
          return <div key={item}>{item || "null"}</div>;
        });
      },
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
      title: "certificate",
      dataIndex: "certificate",
      key: "certificate",
      render: (img) => {
        return <Image src={img} width={200} ></Image>;
      },
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
      // Koi.imagesList = [
      //   {
      //     image: "string"
      //   }
      // ]
      setSubmitKoi(true);
      //convert Object to string img
      Koi.imageUrl = await uploadFile(Koi.imageUrl.file.originFileObj);
      Koi.imagesList = await Promise.all(Koi.imagesList.fileList.map(async (img) => {
        const url = await uploadFile(img.originFileObj)
        return {
          image: url
        }
      }))

      console.log(Koi);
      if (Koi.id) {
        //update
        await api.put(`koi/${Koi.id}`, Koi);
      } else {
        //create
        await api.post(`koi`, Koi);
        console.log(Koi.imagesList)
      }
      fetchKoi();
      toast.success("Update successfully!!!");
      formStand.resetFields();
      handleClosenModal();
    } catch (err) {
      toast.error("err");
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
          labelCol={{ span: 6 }}
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
          <Form.Item
            label="Quantity"
            rules={[{ required: true, message: "Please Input" }]}
            name="quantity"
          >
            <InputNumber></InputNumber>
          </Form.Item>
          <Form.Item label="Breed Name" name="breedId">
            <Select mode="multiple">
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
          <Form.Item label="imageUrl" name="imageUrl">
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

          <Form.Item label="imagesList" name="imagesList">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileListArray}
              onPreview={handlePreview}
              onChange={handleChangeList}
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
      <Table
        columns={cols}
        dataSource={KoiFish}
        scroll={{ x: "max-content" }}
      ></Table>
    </div>
  );
};
export default ManagementKoi;
