import { Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";

function History() {
  const [orderList, setOrderList] = useState([]);
  const fetchOrder = async () => {
    const response = await api.get("order");
    setOrderList(response.data);
    console.log(orderList);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={orderList}></Table>
    </div>
  );
}

export default History;
