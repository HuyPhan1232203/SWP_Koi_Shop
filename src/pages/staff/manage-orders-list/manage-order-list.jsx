import { useEffect, useState } from "react";
import { Button, Select, Table } from "antd";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function ManageOrders() {
  const [orderList, setOrderList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({}); // Track staff assignments by order ID
  //FETCH
  const fetchOrder = async () => {
    try {
      const res = await api.get("order/my-orders");
      console.log(res.data);
      setOrderList(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const StartDateDisplay = (startDate) => {
    const formattedDate = new Date(startDate).toLocaleString();
    return (
      <div>
        <div>{formattedDate}</div>
      </div>
    );
  };
  //UPDATE
  const handleEditOrderStatus = async (id) => {
    const status = String(selectedStatus.value);
    try {
      const res = await api.put(
        `order/status?orderId=${id}&newStatus=${status}`
      );
      console.log(res.data);
      fetchOrder();
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const columns = [
    {
      title: "Order id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return StartDateDisplay(date);
      },
    },
    {
      title: "Price",
      dataIndex: "finalAmount",
      key: "finalAmount",
    },

    {
      title: "Current Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Update Status",
      dataIndex: "id",
      key: "id",
      render: () => (
        <Select
          style={{ width: "200px", color: "#000" }}
          onChange={(value) =>
            setSelectedStatus((prev) => ({ ...prev, value }))
          }
        >
          <Select.Option style={{ color: "#000" }} value="PENDING">
            PENDING
          </Select.Option>
          <Select.Option style={{ color: "#000" }} value="CONFIRMED">
            CONFIRMED
          </Select.Option>
          <Select.Option style={{ color: "#000" }} value="PAID">
            PAID
          </Select.Option>
          <Select.Option style={{ color: "#000" }} value="CANCELLED">
            CANCELLED
          </Select.Option>
          <Select.Option style={{ color: "#000" }} value="DECLINED">
            DECLINED
          </Select.Option>
          <Select.Option style={{ color: "#000" }} value="SHIPPED">
            SHIPPED
          </Select.Option>
          <Select.Option style={{ color: "#000" }} value="COMPLETED">
            COMPLETED
          </Select.Option>
        </Select>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <>
          <Button
            onClick={() => {
              handleEditOrderStatus(id);
            }}
          >
            Confirm
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={orderList}
      scroll={{ x: "max-content" }}
    ></Table>
  );
}

export default ManageOrders;
