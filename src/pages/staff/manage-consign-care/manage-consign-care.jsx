import React, { useEffect, useState } from "react";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";
import { Image, Table } from "antd";
import api from "../../../config/axios";

function CareConsign() {
  const [koiList, setKoiList] = useState([]);
  const fetchKoi = async () => {
    const res = await api.get("consignment/staff");
    setKoiList(res.data);
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
      title: "type",
      dataIndex: "type",
      key: "type",
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
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
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
      title: "Care Type",
      dataIndex: "careTypeName",
      key: "careTypeName",
    },
  ];
  return <Table columns={columns} dataSource={koiList}></Table>;
}

export default CareConsign;
