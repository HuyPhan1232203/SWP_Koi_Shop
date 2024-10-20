import React, { useEffect, useState } from "react";
import uploadFile from "../../../utils/file";
import api from "../../../config/axios";
import { toast } from "react-toastify";
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
import { PlusOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeKoi } from "../../../redux/features/koiSlice";

function ConsignmentOffline() {
  const [formStand] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submitBreed, setSubmitBreed] = useState([]);
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
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleSubmitKoi = async (Koi) => {
    try {
      console.log(Koi);
      //convert Object to string img
      Koi.imageUrl = await uploadFile(Koi.imageUrl.file.originFileObj);
      console.log(Koi.imageUrl);
      dispatch(storeKoi(Koi));
      console.log(Koi);
      nav("check-consign");
    } catch (err) {
      toast.error("err");
    }
  };
  return (
    <div className="Consign_body row">
      <div className="Consign_body-form col-md-6">
        <h2>Show Us Your Koi</h2>
        <Form className="form-depo"
          labelCol={{ span: 9 }}
          onFinish={handleSubmitKoi}
          form={formStand}
        >
          <Form.Item label="Born Year" name="bornYear">
            <Input></Input>
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
            label="Quantity"
            rules={[{ required: true, message: "Please Input" }]}
            name="quantity"
          >
            <InputNumber></InputNumber>
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

          <Form.Item label="Image" name="imageUrl">
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
          <Button className="con-btn" onClick={formStand.submit}>
            Deposit
          </Button>
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
      <div className="Consign_body-show_consign col-md-6" >
        <Outlet />
        {/* <img src="./assets/images/koi-1.avif" className="koi-pic"></img> */}
      </div>
    </div>
  );
}

export default ConsignmentOffline;
