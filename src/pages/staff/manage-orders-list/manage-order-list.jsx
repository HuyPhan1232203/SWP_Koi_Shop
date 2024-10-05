import React from "react";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";
import { Button, Form, Popconfirm, Table } from "antd";
import Input from "antd/es/input/Input";
import { Tab } from "bootstrap";

function ManageOrders() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Voucher ID",
      dataIndex: "voucherId",
      key: "voucherId",
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <>
        <Button>Confirm</Button>
        
        <Popconfirm title="Deny order" description="Deny this order?">
        <Button danger>Deny</Button>
        </Popconfirm>
        </>
      )
    },
  ];

  
  return (
    <Table columns={columns}></Table>
  );
}

export default ManageOrders;
