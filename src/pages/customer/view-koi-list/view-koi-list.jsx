import { Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function ViewKoiList() {
  const [datas, setDatas] = useState([]);

  // GET
  const fetchData = async () => {
    try {
      const response = await api.get("koi");
      setDatas(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  // CREATE or UPDATE
  const handleSubmit = () => {};

  // DELETE
  const handleDelete = (id) => {};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table dataSource={datas} />
    </div>
  );
}

export default ViewKoiList;
