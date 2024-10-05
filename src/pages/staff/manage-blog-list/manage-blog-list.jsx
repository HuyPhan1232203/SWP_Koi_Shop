import React from "react";
import CRUDTemplate from "../../../conponent/crud-template/crud-template";

function ManageBlog() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];
  return <CRUDTemplate columns={columns} />;
}

export default ManageBlog;
