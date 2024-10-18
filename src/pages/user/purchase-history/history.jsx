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
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "PENDING") {
          return <div style={{ color: "red" }}>{status}</div>;
        } else {
          return <div style={{ color: "green" }}>{status}</div>;
        }
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={orderList}
        pagination={{ pageSize: 7 }}
      ></Table>
    </div>
  );
}

export default History;
