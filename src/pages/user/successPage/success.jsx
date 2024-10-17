import { Button, Result } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Success() {

  return (
    <div>
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Link to="/">
          <Button type="primary" key="console">
            Go Home Page
          </Button>
          </Link>
        ]}
      />
    </div>
  );
}

export default Success;
