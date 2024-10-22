import React, { useEffect } from "react";
import useGetParams from "../../hooks/useGetParam";
import api from "../../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import "./success.css";

function SuccessPageForConsign() {
  const nav = useNavigate();

  const params = useGetParams();
  const orderID = params("orderID");
  const transID = params("consignmentID");
  const vnp_TransactionStatus = params("vnp_TransactionStatus");
  console.log("orderID: ", orderID);
  console.log("consignmentID: ", transID);
  console.log("vnp_TransactionStatus: ", vnp_TransactionStatus);

  const postOrderID = async () => {
    try {
      const response = await api.post(
        `/consignment/transactions?consignmentID=${consignmentID}`
      );
      console.log("Transaction saved:", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (vnp_TransactionStatus === "00") {
      postOrderID();
    } else {
      // Failed
      nav("/failed");
    }
  }, [vnp_TransactionStatus]);

  return (
    <div className="success-section">
      <h2>KOI SHOP</h2>
      <p>Thank you for your payment</p>
      <div className="success-text">
        <img
          className="success-img"
          src="https://icons.veryicon.com/png/o/miscellaneous/collect-and-receive-cash/successful-payment-3.png"
        ></img>
        <p>Payment Successful</p>
        <p className="sub-text">
          Order number: {orderID} Cloud server configuration takes 1-5 minutes,
          please wait.
        </p>
        <Link to="/">
          <button>Go To Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessPageForConsign;
