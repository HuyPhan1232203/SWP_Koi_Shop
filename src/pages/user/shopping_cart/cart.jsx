import "./cart.css";
import { Table } from "antd";
function Cart() {
  const col = [
    {
      title: "Koi Fish",
    },
    {
      title: "Price",
    },
    {
      title: "Quality",
    },
    {
      title: "Action",
    },
  ];
  return (
    <div>
      <h1 className="cart_title text-center">Your Cart Contain</h1>
      <Table columns={col}></Table>
    </div>
  );
}

export default Cart;
