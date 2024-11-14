import { useEffect, useState } from "react";
import { Button, Image, Select, Table } from "antd";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function CareConsign() {
  const [selectedStatus, setSelectedStatus] = useState({}); // Track staff assignments by order ID
  const [koiList, setKoiList] = useState([]);
  const fetchKoi = async () => {
    const res = await api.get("consignment/staff");
    setKoiList(res.data.reverse());
  };

  const handleEditOrderStatus = async (id) => {
    console.log(id);
    const status = String(selectedStatus.value);
    try {
      const res = await api.put(
        `consignment/status?consignmentId=${id}&newStatus=${status}`
      );
      console.log(res.data);
      fetchKoi();
    } catch (err) {
      toast.error(err);
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
  useEffect(() => {
    fetchKoi();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "consignmentID",
      key: "consignmentID",
    },
    {
      title: "Koi ID",
      dataIndex: "details",
      key: "details",
      render: (details) => {
        return details.map((koi) => {
          return <div key={koi.koiId}>{koi.koiId}</div>;
        });
      },
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        if (type === "OFFLINE") {
          return <div style={{ color: "red" }}>{type}</div>;
        } else {
          return <div style={{ color: "green" }}>{type}</div>;
        }
      },
    },
    {
      title: "Image",
      dataIndex: "details",
      key: "details",
      render: (details) => {
        return details.map((detail) => {
          return (
            <Image
              key={detail.koiId}
              src={detail.imageUrl}
              width={100}
              height={100}
            ></Image>
          );
        });
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => {
        return StartDateDisplay(startDate);
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => {
        return StartDateDisplay(endDate);
      },
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Koi Price",
      dataIndex: "details",
      key: "details",
      render: (details) => {
        return details.map((koi) => {
          return (
            <div key={koi.koiId}>
              {koi.price || <div style={{ color: "red" }}>N/A</div>}
            </div>
          );
        });
      },
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "CANCELLED" || status === "DECLINED") {
          return (
            <div
              style={{
                padding: "5px",
                backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                color: "#fff",
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
                color: "#fff",
              }}
            >
              {status}
            </div>
          );
        }
      },
    },
    {
      title: "Care Type",
      dataIndex: "careTypeName",
      key: "careTypeName",
    },
    {
      title: "Update Status",
      dataIndex: "consignmentID",
      key: "consignmentID",
      render: () => (
        <Select
          style={{ width: "200px", color: "#000" }}
          onChange={(value) =>
            setSelectedStatus((prev) => ({ ...prev, value }))
          }
        >
          <Select.Option style={{ color: "#000" }} value="CONFIRMED">
            CONFIRMED
          </Select.Option>
          <Select.Option style={{ color: "#000" }} value="DECLINED">
            DECLINED
          </Select.Option>
        </Select>
      ),
    },
    {
      title: "Action",
      dataIndex: "consignmentID",
      key: "consignmentID",
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
      dataSource={koiList}
      scroll={{ x: "max-content" }}
    ></Table>
  );
}

export default CareConsign;
