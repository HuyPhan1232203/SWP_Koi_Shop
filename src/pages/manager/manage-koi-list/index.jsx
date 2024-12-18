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

                const fileList = koi.imagesList
                  ? koi.imagesList.map((image) => ({ url: image }))
                  : [];

                formStand.setFieldsValue({
                  ...koi, // Spread tất cả các trường từ đối tượng koi
                  breedId: selectedBreeds, // Thiết lập giá trị cho breedId trong Select
                  imageUrl: koi.images ? { file: { url: koi.images } } : null, // Thiết lập giá trị cho imageUrl
                  imagesList: { fileList }, // imagesList là một object chứa mảng fileList
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
    console.log(Koi);
    try {
      setSubmitKoi(true);
      //convert Object to string img
      if (!Koi.imageUrl.file.url) {
        Koi.imageUrl = await uploadFile(Koi.imageUrl.file.originFileObj);
      } else {
        Koi.imageUrl = Koi.imageUrl.file.url;
      }
      Koi.imagesList = await Promise.all(
        Koi.imagesList.fileList.map(async (img, index) => {
          if (img.url) {
            console.log("Using existing URL...");
            return { key: index, image: img.url };
          } else {
            console.log("Uploading file...");
            const uploadedUrl = await uploadFile(img.originFileObj);
            return { key: index, image: uploadedUrl };
          }
        })
      );
      if (Koi.id) {
        //update
        const res = await api.put(`koi/${Koi.id}`, Koi);
        console.log("update" + res.data);
        setFileList([]);
        setFileListArray([]);
      } else {
        //create
        await api.post(`koi`, Koi);
        console.log(Koi.imagesList);
        setFileList([]);
        setFileListArray([]);
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please enter the price" },
              {
                type: "number",
                min: 1000,
                message: "Price must be at least 1000",
              },
            ]}
          >
            <InputNumber min={1000} />
          </Form.Item>

          <Form.Item
            label="Vendor"
            name="vendor"
            rules={[{ required: true, message: "Please enter the vendor" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Born Year"
            name="bornYear"
            rules={[
              { required: true, message: "Please enter the born year" },
              {
                type: "number",
                min: 1900,
                max: new Date().getFullYear(),
                message: "Enter a valid year",
              },
            ]}
          >
            <InputNumber min={1900} max={new Date().getFullYear()} />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please enter the quantity" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item label="Breed Name" name="breedId">
            <Select mode="multiple">
              {submitBreed.map((breed) => (
                <Select.Option key={breed.id} value={breed.id}>
                  {breed.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Origin"
            name="origin"
            rules={[{ required: true, message: "Please enter the origin" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select a gender" }]}
          >
            <Radio.Group>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Size"
            name="size"
            rules={[
              { required: true, message: "Please enter the size" },
              { type: "number", message: "Invalid input for size" },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="imageUrl"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
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

          <Form.Item
            label="Image List"
            name="imagesList"
            rules={[
              { required: true, message: "Please upload at least one image" },
            ]}
          >
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileListArray}
              onPreview={handlePreview}
              onChange={handleChangeList}
            >
              {fileListArray.length >= 8 ? null : uploadButton}
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
