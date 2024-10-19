import { Button, Result } from "antd";
import React, { useEffect } from "react";
import "./failed.css";
import { Link, useNavigate } from "react-router-dom";
import useGetParams from "../hooks/useGetParam";
import api from "../../config/axios";

function FailedPage() {
  const nav = useNavigate();

  const params = useGetParams();
  const orderID = params("orderID");
  const vnp_TransactionStatus = params("vnp_TransactionStatus");
  console.log("orderID: ", orderID);
  console.log("vnp_TransactionStatus: ", vnp_TransactionStatus);

  const postOrderID = async () => {
    try {
      const response = await api.post(`/order/transaction?orderID=${orderID}`);
      console.log("Transaction saved:", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (vnp_TransactionStatus === "02") {
      postOrderID();
    }
  }, [vnp_TransactionStatus]);
  return (
    <div>
      <div className="failed-section">
        <h2>KOI SHOP</h2>
        <p>Please Try Again!</p>
        <div className="failed-text">
          <img
            className="failed-img"
            src="https://cdn2.iconfinder.com/data/icons/e-commerce-535/64/Payment_failed-1024.png"
          ></img>
          <p>Something went wrong with your payment</p>
          <p className="sub-text">
            Cloud server configuration takes 1-5 minutes, please wait.
          </p>
          <Link to="/check-out">
            <button>Check Out Again</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FailedPage;
