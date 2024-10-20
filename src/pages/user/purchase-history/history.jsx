import { Button } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import "./history.css";
function History() {
  const [orderList, setOrderList] = useState([]);
  const fetchOrder = async () => {
    const response = await api.get("order/customer");
    setOrderList(response.data);
    console.log(orderList);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div className="history" style={{ height: "500px", overflowY: "auto" }}>
      {orderList.map((order) => {
        return (
          <div key={order.id} className="order">
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
              <Button className="bton">Rating</Button>
              <Button>Connect to seller</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default History;
