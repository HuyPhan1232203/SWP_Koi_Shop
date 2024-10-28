import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import "./check_consignment-on.css";
import { Link, Outlet } from "react-router-dom";
import { Button } from "antd";
function CheckConsignOnl() {
  return (
    <div className="consign-history">
      <Link to="">
        <Button>Sell</Button>
      </Link>
      <Link to="care">
        <Button>Care</Button>
      </Link>
      <div className="check_consign">
        <Outlet />
      </div>
    </div>
  );
}

export default CheckConsignOnl;
