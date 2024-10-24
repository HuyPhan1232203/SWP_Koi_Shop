import React, { useEffect, useState } from "react";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";
import { Table } from "antd";
import api from "../../../config/axios";

function CareConsign() {
  const [koiList, setKoiList] = useState([]);
  const fetchKoi = async () => {
    const res = await api.get("consignment/staff");
    console.log(res.data);
  };
  useEffect(() => {
    fetchKoi();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "imgUrl",
      key: "imgUrl",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      dataIndex: "isConsignment",
      key: "isConsignment",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];
  return <Table columns={columns}></Table>;
}

export default CareConsign;
