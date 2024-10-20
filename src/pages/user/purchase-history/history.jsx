import { Button, Form, Input, Modal, Rate } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import "./history.css";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
function History() {
  const [orderList, setOrderList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const fetchOrder = async () => {
    const response = await api.get("order/customer");
    setOrderList(response.data);
    console.log(orderList);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const handleRating = async (feedback) => {
    try {
      const response = api.post(`feedback/on-orders?id=4`, feedback);
      console.log(response.data);
    } catch (err) {
      toast.error(err);
    }
  };
  const handleShowStatus = (string) => {
    if (string === "PENDING") {
      return (
        <div style={{ display: "flex" }}>
          Status:
          <div style={{ color: "red" }}>{string}</div>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex" }}>
          Status:jhvjh
          <div style={{ color: "green" }}>{string}</div>
        </div>
      );
    }
  };
  return (
    <div className="history" style={{ height: "500px", overflowY: "auto" }}>
      <p style={{ fontSize: "50px" }}>Order History</p>
      {orderList.map((order) => {
        return (
          <div key={order.id} className="order">
            <div className="status">
              <div>{order.date}</div>
              <div
                style={{ borderLeft: "1px #ccc solid", paddingLeft: "10px" }}
              >
                {handleShowStatus(order.status)}
              </div>
            </div>
            {order.orderDetails.map((koi) => (
              <div key={koi.id} className="koi_detail row">
                <img
                  src={koi.imageUrl}
                  className="col-md-2"
                  alt=""
                  width={100}
                  height={100}
                />
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  className="col-md-8"
                >
                  <div style={{ fontWeight: "600", fontSize: "20px" }}>
                    {koi.koiName}
                  </div>
                  <small>description: {order?.description}</small>
                </div>
                <div className="col-md-2 koiPrice">${koi.price}</div>
              </div>
            ))}
            <div className="total">
              Total: <p style={{ color: "green" }}>${order.total}</p>
            </div>
            <div className="buttons">
              <Button
                className="bton"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Rating
              </Button>
              <Button>Connect to seller</Button>
            </div>
            <Modal
              open={openModal}
              title="Rating"
              onCancel={() => {
                setOpenModal(false);
                form.resetFields();
              }}
              onOk={form.submit}
            >
              <Form form={form} onFinish={handleRating}>
                <Form.Item
                  label="Rate"
                  name="rating"
                  rules={[
                    { required: true, message: "please rate before submit" },
                  ]}
                >
                  <Rate></Rate>
                </Form.Item>
                <Form.Item
                  label="Feedback"
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "please write something before submit",
                    },
                  ]}
                >
                  <TextArea></TextArea>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        );
      })}
    </div>
  );
}

export default History;
