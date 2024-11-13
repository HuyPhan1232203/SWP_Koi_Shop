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
import TextArea from "antd/es/input/TextArea";
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
      const response = await api.get("koi/manager?page=0&size=100");
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
  const handleChange = ({ fileList: newFileList }) => {
    // Limit the fileList to a maximum of 1
    setFileList(newFileList.slice(-1)); // Keep only the last uploaded file
  };
  const handleChangeList = ({ fileList: newFileList }) =>
    setFileListArray(newFileList);

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
        return <Image src={imageUrl} alt="" width={100} height={100} />;
      },
    },
    {
      title: "SubImage",
      dataIndex: "imagesList",
      key: "imagesList",
      render: (imageUrl) => {
        return imageUrl.map((img) => {
          return <Image key={img} src={img} width={60} height={60}></Image>;
        });
      },
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      render: (sold) => {
        if (sold === true) {
          return (
            <div
              style={{
                backgroundColor: "red",
                fontWeight: "600",
                border: "1px red solid",
                padding: "5px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              SOLD
            </div>
          );
        } else if (sold === false) {
          return (
            <div
              style={{
                backgroundColor: "green",
                fontWeight: "600",
                border: "1px green solid",
                padding: "5px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              ON SELL
            </div>
          );
        }
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
                const selectedBreeds = submitBreed
                  .filter((breed) => koi.breeds.includes(breed.name))
                  .map((breed) => breed.id);

                formStand.setFieldsValue({
                  ...koi, // Lấy tất cả các trường từ đối tượng koi
                  breedId: selectedBreeds, // Thiết lập giá trị cho breedId trong Select
                  imageUrl: koi.images ? { file: { url: koi.images } } : null,
                  imagesList: koi.imagesList
                    ? koi.imagesList.map((image) => ({ file: { url: image } }))
                    : null, // Assuming koi.imagesList is an array
                });

                // Handling single image file item
                const fileItem = koi.images
                  ? {
                      uid: "-1",
                      name: "image.png",
                      status: "done",
                      url: koi.images,
                    }
                  : null;

                // Handling list of images
                const fileListItems = koi.imagesList
                  ? koi.imagesList.map((image, index) => ({
                      uid: String(index), // Unique id for each file item
                      name: `image-${index}.png`,
                      status: "done",
                      url: image,
                    }))
                  : [];

                setFileList(fileItem ? [fileItem] : []); // Set single image in file list
                setFileListArray(fileListItems); // Set list of images in file list array
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
      //convert Object to string img
      if (!Koi.imageUrl.file.url) {
        Koi.imageUrl = await uploadFile(Koi.imageUrl.file.originFileObj);
      } else {
        Koi.imageUrl = Koi.imageUrl.file.url;
      }
      Koi.imagesList = await Promise.all(
        Koi.imagesList.fileList.map(async (img) => {
          const url = await uploadFile(img.originFileObj);
          return {
            image: url,
          };
        })
      );
      if (Koi.id) {
        //update
        await api.put(`koi/${Koi.id}`, Koi);
      } else {
        //create
        await api.post(`koi`, Koi);
        console.log(Koi.imagesList);
      }
      fetchKoi();
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
            <InputNumber min={1}></InputNumber>
          </Form.Item>
          <Form.Item label="Breed Name" name="breedId">
            <Select mode="multiple">
              {submitBreed.map((breed) => (
                <Select.Option key={breed.id} breed={breed} value={breed.id}>
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
            <TextArea></TextArea>
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
              {fileList.length < 1 ? uploadButton : null}
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
