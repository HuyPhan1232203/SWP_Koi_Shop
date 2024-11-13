import { useEffect, useState } from "react";
import { Button, Select, Table, Spin } from "antd";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function ManageStaffJob() {
  const [orderList, setOrderList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState({}); // Track staff assignments by order ID

  const fetchOrder = async () => {
    try {
      const response = await api.get("order/all-payments");
      const reversedOrderList = response.data.reverse(); // Reverse the order of the fetched data
      setOrderList(reversedOrderList);
    } catch (error) {
      toast.error(error + " Error fetching orders");
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await api.get("staff");
      setStaffList(response.data);
    } catch (error) {
      toast.error(error + "Error fetching staff");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchOrder(), fetchStaff()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAssignStaff = async (orderId) => {
    console.log(orderId);
    const staffId = selectedStaff[orderId.paymentID];
    console.log(staffId);
    if (!staffId) {
      toast.error("Please select a staff member.");
      return;
    }
    try {
      // await
      if (orderId.consignmentID == undefined) {
        api.put(
          `order/assign-staff?orderId=${orderId.orderID}&staffId=${staffId}`
        );
      } else if (orderId.orderID == undefined) {
        api.put(
          `order/assign-staff?staffId=${staffId}&consignmentId=${orderId.consignmentID}`
        );
      } else if (
        orderId.orderID != undefined &&
        orderId.consignmentID != undefined
      ) {
        api.put(
          `order/assign-staff?orderId=${orderId.orderID}&staffId=${staffId}&consignmentId=${orderId.consignmentID}`
        );
      }
      toast.success("Staff assigned successfully!");
    } catch (err) {
      toast.error(err + "Error assigning staff");
    } finally {
      fetchOrder();
      fetchStaff();
    }
  };

  const cols = [
    {
      title: "Payment ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (_, record) => {
        return (
          <div>{record.order?.id !== undefined ? record.order?.id : "N/A"}</div>
        );
      },
    },
    {
      title: "Consignment ID",
      dataIndex: "id",
      key: "id",
      render: (_, record) => {
        return (
          <div>
            {record.consignment?.consignmentID !== undefined
              ? record.consignment?.consignmentID
              : "N/A"}
          </div>
        );
      },
    },
    {
      title: "Staff Name",
      dataIndex: "id",
      key: "id",
      render: (_, record) => {
        return staffList.map((staff) => {
          if (
            staff.staff.id === record?.order?.staffId ||
            staff.staff.id === record?.consignment?.staffid
          ) {
            return <div key={staff.staff.id}>{staff.staff.username}</div>;
          }
        });
      },
    },
    {
      title: "Assign Work To Staff",
      dataIndex: "id",
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
            <Select.Option key={staff.staff.id} value={staff.staff.id}>
              {staff.staff.username}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action",
      dataIndex: "id", // Set to a single index, since multiple indices directly are not supported
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            type="primary"
            onClick={() =>
              handleAssignStaff({
                paymentID: record?.id,
                orderID: record?.order?.id, // Optional chaining for safe access
                consignmentID: record?.consignment?.consignmentID, // Optional chaining for safe access
              })
            }
          >
            Save
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <Spin />;
  }

  return <Table columns={cols} dataSource={orderList} rowKey="id" />;
}

export default ManageStaffJob;
