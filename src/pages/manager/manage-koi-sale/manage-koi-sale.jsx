import { Button, Form, Image, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function ManageKoiSale() {
  const [koiList, setKoiList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const handleSale = async (value) => {
    try {
      value.koiId = value.id;
      console.log(value);
      const res = await api.post("koi/sale", value);
      console.log(res.data);
    } finally {
      fetchKoi();
      setShowModal(false);
    }
  };
  const fetchKoi = async () => {
    try {
      const response = await api.get("koi?page=0&size=100");
      console.log(response.data);
      setKoiList(response.data.content);
    } catch (err) {
      toast.error(err.response.data.content);
    }
  };
  useEffect(() => {
    fetchKoi();
  }, []);
  const col = [
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
      title: "Sale Price",
      dataIndex: "salePrice",
      key: "salePrice",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Percentage",
      dataIndex: "salePercentage",
      key: "salePercentage",
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
                setShowModal(true);
                form.setFieldsValue(koi);
              }}
            >
              Sale
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table columns={col} dataSource={koiList} />
      <Modal
        open={showModal}
        onCancel={() => {
          setShowModal();
        }}
        onOk={form.submit}
      >
        <Form form={form} onFinish={handleSale}>
          <Form.Item label="ID: " name="id" hidden>
            <Input></Input>
          </Form.Item>
          <Form.Item label="Precentage: " name="salePercentage">
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageKoiSale;
