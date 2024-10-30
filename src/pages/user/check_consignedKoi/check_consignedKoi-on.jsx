import "./check_consignment-on.css";
import { Tabs } from "antd";
import Sell from "./check_consignedKoi-sell/sell";
import Care from "./check_consignedKoi-care/care";
function CheckConsignOnl() {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Consign for sell",
      children: <Sell />,
    },
    {
      key: "2",
      label: "Consign for care",
      children: <Care />,
    },
  ];
  return (
    <div className="consign-history">
      <div className="check_consign">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
}

export default CheckConsignOnl;
