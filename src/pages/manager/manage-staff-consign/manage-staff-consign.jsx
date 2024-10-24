import { Button, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/axios";

function ManageStaffConsign() {
  const [conSignList, setConSignList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({}); // Track staff assignments by order ID
  const fetchConsign = async () => {
    try {
      const res = await api.get("consignment/manager");
      console.log(res.data);
      setConSignList(res.data);
    } catch (err) {
      toast.error(err);
    }
  };
  const fetchStaff = async () => {
    try {
      const response = await api.get("account?role=STAFF");
      setStaffList(response.data);
    } catch (error) {
      toast.error("Error fetching staff");
    }
  };
  const handleAssignStaff = async (asignId) => {
    console.log(asignId);
    const staffId = selectedStaff[asignId];
    if (!staffId) {
      toast.error("Please select a staff member.");
      return;
    }
    try {
      await api.put(
        `consignment/assign-staff?consignmentId=${asignId}&staffId=${staffId}`
      );
      toast.success("Staff assigned successfully!");
    } catch (err) {
      toast.error("Error assigning staff");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchConsign(), fetchStaff()]);
    };
    fetchData();
  }, []);

  const cols = [
    {
      title: "ID",
      dataIndex: "consignmentID",
      key: "consignmentID",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Care Type",
      dataIndex: "careTypeName",
      key: "careTypeName",
    },
    {
      title: "Staff",
      dataIndex: "staffid",
      key: "staffid",
      render: (staffid) => {
        console.log(staffid);
        return staffList.map((staff) => {
          if (staff.id === staffid) {
            console.log(staff);
            return <div key={staff.id}>{staff.username}</div>;
          }
        });
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "PENDING") {
          return (
            <div
              style={{
                padding: "5px",
                backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {status}
            </div>
          );
        } else {
          return (
            <div
              style={{
                padding: "5px",
                backgroundColor: "green",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {status}
            </div>
          );
        }
      },
    },
    {
      title: "Staff",
      dataIndex: "consignmentID",
      key: "staff",
      render: (id) => (
        <Select
          style={{ width: "200px" }}
          onChange={(value) =>
            setSelectedStaff((prev) => ({ ...prev, [id]: value }))
          }
          value={selectedStaff[id] || undefined}
        >
          {staffList.map((staff) => (
            <Select.Option key={staff.id} value={staff.id}>
              {staff.username}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action",
      dataIndex: "consignmentID",
      key: "action",
      render: (id) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button type="primary" onClick={() => handleAssignStaff(id)}>
            Save
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={cols} dataSource={conSignList}></Table>
    </div>
  );
}

export default ManageStaffConsign;
