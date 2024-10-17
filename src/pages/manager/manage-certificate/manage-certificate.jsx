import React, { useEffect, useState } from "react";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";
import { Button, Form, Input, Modal, Table, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

function ManageCertificate() {
  const [certificates, setCertificates] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [formStand] = Form.useForm();

  // GET
  const fetchCertifiacte = async () => {
    try {
      const response = await api.get("certificate");
      setCertificates(response.data);
      console.log(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchCertifiacte();
  }, []);

  // CREATE OR UPDATE
  const handleSubmitCertificate = () => {};

  // DELETE
  const handleDeleteCertificate = () => {};

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

  //OPEN MODAL
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  //CLOSE MODEL
  const handleClosenModal = () => {
    setOpenModal(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "certificateId",
      key: "certificateId",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => {
        return <Image src={imageUrl} width={200} />;
      },
    },
    {
      title: "Koi Name",
      dataIndex: ["koi", "name"],
      key: "koiName",
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
  return (
    <div>
      <div className="header text-center p-5 ">
        <h1 className="header_text" style={{ color: "#FE7A36" }}>
          Certificate Management
        </h1>
      </div>
      <Button onClick={handleOpenModal}> Create Certificate</Button>
      <Modal
        title={<span className="Modal_header">CERTIFICATE INFORMATION</span>}
        open={openModal}
        onCancel={handleClosenModal}
        onOk={formStand.submit}
      >
        <Form labelCol={{ span: 5 }} form={formStand}>
          <Form.Item hidden label="ID" name="certificateId">
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Koi Name"
            name={["koi", "name"]}
            rules={[{ required: true, message: "Please Input" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="imageUrl"
            name="imageUrl"
            rules={[{ required: true, message: "Please Upload" }]}
          >
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
      <Table columns={columns} dataSource={certificates} />
    </div>
  );
}

export default ManageCertificate;
