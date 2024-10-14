import React, { useEffect, useState } from "react";
import { Button, Select, Table } from "antd";
import api from "../../../config/axios";

function ManageStaffJob() {
  const [orderList, setOrderList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const fetchOrder = async () => {
    const response = await api.get("order");
    setOrderList(response.data);
  };
  const fetchStaff = async () => {
    const response = await api.get("account?role=STAFF");
    setStaffList(response.data);
    console.log(staffList);
  };
  useEffect(() => {
    fetchOrder();
    fetchStaff();
  }, []);
  const cols = [
    {
      title: "OrderId",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Staff",
      key: "id",
      render: () => {
        return (
          <Select style={{ width: "200px" }}>
            {staffList.map((staff) => {
              return (
                <Select.Option key={staff.id}>{staff.username}</Select.Option>
              );
            })}
          </Select>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, koi) => {
        return (
          <div
            style={{
              display: "flex",
              width: "150px",
              justifyContent: "space-around",
            }}
          >
            <Button type="primary">Save</Button>
          </div>
        );
      },
    },
  ];
  return <Table columns={cols} dataSource={orderList}></Table>;
}

export default ManageStaffJob;
