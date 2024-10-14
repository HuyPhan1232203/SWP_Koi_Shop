import React, { useEffect, useState } from "react";
import "./deposit.css";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
} from "antd";
import uploadFile from "../../../utils/file";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { PlusOutlined } from "@ant-design/icons";

function Deposit() {
  const [formStand] = Form.useForm();
  const [KoiFish, setKoiFish] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [submitBreed, setSubmitBreed] = useState([]);
  const [submitKoi, setSubmitKoi] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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
  const fetchKoi = async () => {
    try {
      const response = await api.get("koi?page=0&size=20");
      setKoiFish(response.data.content);
    } catch (err) {
      toast.error(err.response.data);
    }
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
  //USE EFFECT
  useEffect(() => {
    fetchBreed();
  }, []);
  //SUBMIT
  const handleSubmitKoi = async (Koi) => {
    try {
      console.log(Koi);
      setSubmitKoi(true);
      //convert Object to string img
      Koi.imageUrl = await uploadFile(Koi.imageUrl.file.originFileObj);
      console.log(Koi.imageUrl);
      if (Koi.id) {
        //update
        await api.put(`koi/${Koi.id}`, Koi);
      } else {
        //create
        await api.post(`koi`, Koi);
      }
      fetchKoi();
      toast.success("Update successfully!!!");
      formStand.resetFields();
    } catch (err) {
      toast.error("err");
    } finally {
      setSubmitKoi(false);
    }
  };
  return (
    <div className="Introduction">
      <h1 className="Intro_header">Deposit Koi</h1>
      <div className="Intro_body row">
        <div className="Intro_body-form col-md-6">
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
                  <Select.Option
                    key={breed.name}
                    breed={breed}
                    value={breed.id}
                  >
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
            <Button>Deposit</Button>
          </Form>
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
        </div>
      </div>
    </div>
  );
}

export default Deposit;
