import { Button, Result } from "antd";
import React from "react";
import "./failed.css"
import { Link } from "react-router-dom";

function FailedPage() {
  return (
    <div>
      <div className="failed-section"> 
      <h2>KOI SHOP</h2>
      <p>Please Try Again!</p>
      <div className="failed-text">
        <img className="failed-img" src="https://cdn2.iconfinder.com/data/icons/e-commerce-535/64/Payment_failed-1024.png"></img>
        <p>Something went wrong with your payment</p>
        <p className="sub-text">Cloud server configuration takes 1-5 minutes, please wait.</p>
        <Link to="/check-out">
        <button>Check Out Again</button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default FailedPage;
