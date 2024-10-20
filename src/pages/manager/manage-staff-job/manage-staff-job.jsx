import React, { useEffect, useState } from "react";
import { Button, Select, Table } from "antd";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function ManageStaffJob() {
  const [orderList, setOrderList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const fetchOrder = async () => {
    const response = await api.get("order");
    setOrderList(response.data);
  };
  const handleAsignStaff = async () => {
    try {
      const response = await api.put(
        `order/assign-staff?orderId=${selectedOrder}&staffId=${selectedStaffId}`
      );
      console.log(response.data);
    } catch (err) {
      toast.error(err);
    }
  };
  const fetchStaff = async () => {
    const response = await api.get("account?role=STAFF");
    setStaffList(response.data);
  };
  useEffect(() => {
    fetchOrder();
    fetchStaff();
  }, []);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const handleSelectStaff = (value) => {
    console.log(value);
    setSelectedStaffId(value); // Store selected staff ID
  };
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
          <Select
            style={{ width: "200px" }}
            onChange={handleSelectStaff}
            value={selectedStaffId}
          >
            {staffList.map((staff) => {
              return (
                <Select.Option key={staff.id} value={staff.id}>
                  {staff.username}
                </Select.Option>
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
            <Button
              type="primary"
              onClick={() => {
                setSelectedOrder(id);
                console.log(id);
                handleAsignStaff();
              }}
            >
              Save
            </Button>
          </div>
        );
      },
    },
  ];
  return <Table columns={cols} dataSource={orderList}></Table>;
}

export default ManageStaffJob;
