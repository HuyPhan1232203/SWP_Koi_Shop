import { useState } from "react";
import "./cart.css";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Cart() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const data = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const col = [
    {
      title: "Koi Fish",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quality",
      dataIndex: "quantity",
    },
    {
      title: "Action",
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const handleBuy = async () => {
    console.log(selectedRowKeys);
    try {
      const selectedItems = data.filter((koi) =>
        selectedRowKeys.includes(koi.id)
      );
      console.log(selectedItems);

      const detail = selectedItems.map((koi) => ({
        koiId: koi.id,
        quantity: koi.quantity,
      }));
      const response = await api.post("order", { detail });
      dispatch(clearAll());
      toast.success("success");
    } catch (err) {
      toast.error("Failed");
    }
  };
  return (
    <div>
      <h1 className="cart_title text-center">Your Cart Contain</h1>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={col}
        dataSource={data}
      ></Table>
      <Button onClick={() => dispatch(clearAll())}>Clear All</Button>
      <Button onClick={handleBuy}>Buy</Button>
    </div>
  );
}

export default Cart;
