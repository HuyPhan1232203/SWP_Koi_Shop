import { Button, Result } from "antd";
import React from "react";

function FailedPage() {
  return (
    <div>
      <Result
        status="error"
        title="Payment Failed"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      ></Result>
    </div>
  );
}

export default FailedPage;
