import { Button, Result } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetParams from "../../hooks/useGetParam";

function Success() {
  const nav = useNavigate();

  const params = useGetParams();
  const orderID = params("orderID");
  const vnp_TransactionStatus = params("vnp_TransactionStatus");
  console.log("orderID: ", orderID);
  console.log("vnp_TransactionStatus: ", vnp_TransactionStatus);

  const postOrderID = async () => {
    try {
      const response = await api.post(`/order/transaction?orderID=${orderID}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (vnp_TransactionStatus === "00") {
      postOrderID();
    } else {
      // Failed
      nav("/");
    }
  }, []);

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
          </Link>,
        ]}
      />
    </div>
  );
}

export default Success;
