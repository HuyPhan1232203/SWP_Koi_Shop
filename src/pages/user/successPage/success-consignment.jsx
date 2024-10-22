import React, { useEffect } from "react";
import useGetParams from "../../hooks/useGetParam";
import api from "../../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import "./success.css";

// Successpage cho check-out-consignment

function SuccessConsignmentPage() {
  const nav = useNavigate();

  const params = useGetParams();
  const Orderid = params("Orderid");
  const Consignmentid = params("Consignmentid");
  const vnp_TransactionStatus = params("vnp_TransactionStatus");
  console.log("Orderid: ", Orderid);
  console.log("Consignmentid: ", Consignmentid);
  console.log("vnp_TransactionStatus: ", vnp_TransactionStatus);

  const postOrderID = async () => {
    try {
      const response = await api.post(
        `/consignmentOrder/transaction?Orderid=${Orderid}&Consignmentid=${Consignmentid}`
      );
      console.log("Transaction saved: ", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (vnp_TransactionStatus === 0) {
      postOrderID();
    } else {
      nav("/failed");
    }
  }, []);
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
          Order number: {Orderid} Cloud server configuration takes 1-5 minutes,
          please wait.
        </p>
        <Link to="/">
          <button>Go To Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessConsignmentPage;
