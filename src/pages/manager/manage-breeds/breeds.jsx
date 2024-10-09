import React, { useState } from "react";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";
import { Form, Image, Input, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function Breeds() {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  //upload img
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
  const col = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "imageUrl",
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
  ];
  const formItems = (
    <>
      <Form.Item
        label="Name"
        rules={[{ require: true, message: "please input" }]}
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
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      </Form.Item>
    </>
  );
  return (
    <div>
      <CRUDTemplate
        columns={col}
        formItems={formItems}
        apiName="breed"
        name="Breeds"
      />
    </div>
  );
}

export default Breeds;
