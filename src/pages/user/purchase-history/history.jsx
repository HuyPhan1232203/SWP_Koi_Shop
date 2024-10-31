import { Button, Form, Modal, Rate, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import "./history.css";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

function History() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const StartDateDisplay = (startDate) => {
    const formattedDate = new Date(startDate).toLocaleString();
    return (
      <div>
        <div>{formattedDate}</div>
      </div>
    );
  };
  const handleRating = async (orderID, consignmentid, value) => {
    const res = await api.postForm(
      `feedback/all?orderid=${orderID}&consignmentid=${consignmentid}`,
      value
    );
    console.log(res);
  };
  const [orderList, setOrderList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const fetchOrder = async () => {
    const res = await api.get("order/current-user");
    console.log(res.data);
    setOrderList(res.data);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div>
      {orderList.map((order, index) => {
        return (
          <div key={index}>
            <div className="order row">
              <div className="order_id col-md-1">ID: {order.id}</div>
              <div className="order_date col-md-3">
                {StartDateDisplay(order.createAt)}
              </div>
              <div className="order_descript col-md-6">{order.description}</div>
              <div className="order_status col-md-2">{order.order.status}</div>
              <div>
                {order.order.orderDetails.map((koi) => {
                  return (
                    <div key={koi.id} className="koi row">
                      <img
                        className="koi-img col-md-2"
                        src={koi.imageUrl}
                      ></img>
                      <div className="koi-name col-md-7">{koi.koiName}</div>
                      <div className="koi-price col-md-3">{koi.price} VNĐ</div>
                    </div>
                  );
                })}
                <div className="row order_bot">
                  <div className="order_feedback col-md-6">
                    <div className="content">
                      {order.order?.feedback?.content}
                    </div>
                    <div className="rating">
                      <Rate value={order.order?.feedback?.rating}></Rate>
                    </div>
                  </div>
                  <button
                    className="rate_btn col-md-2"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Rating
                  </button>
                  <div className="order_total  col-md-3">{order.total} VNĐ</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Modal
        open={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <Form>
          {console.log("askjdb")}
          <Form.Item label="Message" name="content">
            <TextArea></TextArea>
          </Form.Item>
          <Form.Item label="Rate" name="rating">
            <Rate></Rate>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default History;
