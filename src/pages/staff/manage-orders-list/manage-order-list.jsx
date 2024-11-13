import { useEffect, useState } from "react";
import { Button, Form, Image, Input, Modal, Select, Table, Upload } from "antd";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/file";

function ManageOrders() {
  const [orderList, setOrderList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({}); // Track staff assignments by order ID
  //FETCH
  const fetchOrder = async () => {
    try {
      const res = await api.get("order/my-orders");
      console.log(res.data);
      setOrderList(res.data);
    } catch (err) {
      console.log(err);
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
  const StartDateDisplay = (startDate) => {
    const formattedDate = new Date(startDate).toLocaleString();
    return (
      <div>
        <div>{formattedDate}</div>
      </div>
    );
  };
  const handleConfirmImage = async (img) => {
    //convert Object to string img
    try {
      console.log(img);
      const imageUrl = await uploadFile(img.image.file.originFileObj);
      const response = await api.put(
        `order/confirm?orderId=${img.id}&image=${imageUrl}`
      );
      fetchOrder();
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setOpenModal(false);
    }
  };
  //UPDATE
  const handleEditOrderStatus = async (id) => {
    const status = String(selectedStatus.value);
    try {
      const res = await api.put(
        `order/status?orderId=${id}&newStatus=${status}`
      );
      console.log(res.data);
    } catch (err) {
      toast.error(err);
    } finally {
      fetchOrder();
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const columns = [
    {
      title: "Order id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Koi id",
      dataIndex: "id",
      key: "id",
      render: (_, record) => {
        console.log(record);
        return (
          <div key={record.id}>
            {record.orderDetails.map((koi) => {
              return <div key={koi.koiId}>{koi.koiId}</div>;
            })}
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return StartDateDisplay(date);
      },
    },
    {
      title: "Price",
      dataIndex: "finalAmount",
      key: "finalAmount",
    },
    {
      title: "Image Confirm",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <Image src={image} width={100} height={100}></Image>;
      },
    },
    {
      title: "Current Status",
      dataIndex: "status",
      key: "status",
      render: (s, data) => {
        if (s === "COMPLETED") {
          return (
            <div>
              <div style={{ color: "green" }}>{s}</div>
              <Button
                onClick={() => {
                  setOpenModal(true);
                  form.setFieldsValue(data);
                }}
              >
                Shipped Image
              </Button>
            </div>
          );
        } else {
          return <div style={{ color: "brown" }}>{s}</div>;
        }
      },
    },
    {
      title: "Update Status",
      dataIndex: "id",
      key: "id",
      render: () => (
        <Select
          style={{ width: "200px", color: "#000" }}
          onChange={(value) =>
            setSelectedStatus((prev) => ({ ...prev, value }))
          }
        >
          <Select.Option style={{ color: "#000" }} value="CONFIRMED">
            CONFIRMED
          </Select.Option>
          <Select.Option style={{ color: "#000" }} value="DECLINED">
            DECLINED
          </Select.Option>
          <Select.Option style={{ color: "#000" }} value="SHIPPING">
            SHIPPING
          </Select.Option>
          <Select.Option style={{ color: "#000" }} value="COMPLETED">
            COMPLETED
          </Select.Option>
        </Select>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              handleEditOrderStatus(id);
            }}
          >
            Confirm
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={orderList}
        scroll={{ x: "max-content" }}
      ></Table>
      <Modal
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        onOk={form.submit}
      >
        <Form form={form} onFinish={handleConfirmImage}>
          <Form.Item label="ID" hidden name="id">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Image" name="image">
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
    </div>
  );
}

export default ManageOrders;
