import { Button, Form, Modal, Rate } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import "./history.css";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
function History() {
  const [orderList, setOrderList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [form] = Form.useForm();
  const fetchOrder = async () => {
    const response = await api.get("order/my-orders");
    setOrderList(response.data);
    console.log(orderList);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const handleRating = async (feedback) => {
    console.log(selectedOrder);
    try {
      const response = api.post(`feedback?id=${selectedOrder}`, feedback);
      console.log(response.data);
      fetchOrder();
    } catch (err) {
      toast.error(err);
    } finally {
      setOpenModal(false);
      fetchOrder();
      form.resetFields();
    }
  };
  const handleShowButton = (order) => {
    if (order.feedback?.content == null) {
      return (
        <Button
          className="bton"
          onClick={() => {
            setOpenModal(true);
            setSelectedOrder(order.id);
          }}
          key={`button-${order.id}`}
        >
          Rating
        </Button>
      );
    }
  };
  const handleShowStatus = (string) => {
    if (string === "PENDING") {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ color: "red", fontSize: "20px" }}>{string}</div>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ color: "green", fontSize: "20px" }}>{string}</div>
        </div>
      );
    }
  };
  const StartDateDisplay = (startDate) => {
    const formattedDate = new Date(startDate).toLocaleString();
    return (
      <div>
        <div>{formattedDate}</div>
      </div>
    );
  };
  return (
    <div className="history">
      <p style={{ fontSize: "50px" }}>Order History</p>
      {[...orderList].reverse().map((order) => {
        return (
          <div key={order.id} className="order">
            <div className="status">
              {StartDateDisplay(order.date)}
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
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: "30px" }}>
                <div>{order.feedback?.content}</div>
                <Rate value={order.feedback?.rating} disabled></Rate>
              </div>
              <div className="total">
                Total: <p style={{ color: "green" }}>${order.finalAmount}</p>
              </div>
            </div>
            <div className="buttons" key={order.id}>
              {handleShowButton(order)}
            </div>
            <Modal
              key={`modal-${order.id}`}
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
