import { useEffect, useState } from "react";
import "./cart.css";
import { Button, Form, Image, Input, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAll, removeProduct } from "../../../redux/features/cartSlice";
import api from "../../../config/axios";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  addSelectedItem,
  clearAllSelectedItem,
} from "../../../redux/features/selectedItemsSlice";

function Cart() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemChosen, setItemChosen] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const data = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const handleDeleteKoi = (id) => {
    try {
      console.log(id);
      dispatch(removeProduct(id));
    } catch (err) {
      toast.error("err");
    }
  };
  const col = [
    {
      title: "image",
      dataIndex: "images",
      render: (img) => {
        return <Image src={img} width={100} height={70}></Image>;
      },
    },
    {
      title: "Koi Fish",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },

    {
      title: "Delete",
      dataIndex: "id",
      render: (id) => {
        return (
          <Button
            type="primary"
            danger
            onClick={() => {
              handleDeleteKoi(id);
            }}
            style={{ padding: "0 5px" }}
          >
            <DeleteOutlined />
          </Button>
        );
      },
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
  const selectedItems = data.filter((koi) => selectedRowKeys.includes(koi.id));
  const handleShowItemsName = () => {
    console.log(selectedItems);
    selectedItems.map((item) => {
      return <div key={item.id}>{setItemChosen(item)}</div>;
    });
  };
  // useEffect(() => {
  //   handleShowItemsName();
  // }, [selectedItems]);
  var total = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const nav = useNavigate();
  const handleBuy = async () => {
    console.log(itemChosen.length);
    if (itemChosen.length > 0) {
      try {
        dispatch(clearAllSelectedItem());
        const selectedItems = data.filter((koi) =>
          selectedRowKeys.includes(koi.id)
        );
        selectedItems.map((item) => {
          dispatch(addSelectedItem(item));
        });
        nav("/check-out");
      } catch (err) {
        toast.error("Failed");
      }
    } else {
      return <h1>nothing</h1>;
    }
  };
  return (
    <div className="cart_page">
      <div className="cart_page_cart">
        <h1 className="cart_title text-center">Your Cart Contain</h1>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={col}
          dataSource={data}
        ></Table>
        <Button onClick={() => dispatch(clearAll())}>Clear All</Button>
      </div>
      <div className="order_bill">
        <h3 className="order_bill_header">Sumary</h3>
        <Form labelCol={{ span: 24 }}>
          <Form.Item label={"Items :"}>
            {selectedItems.map((item) => {
              return (
                <div style={{ fontWeight: "500" }} key={item.id}>
                  +{item.name}
                </div>
              );
            })}
          </Form.Item>

          <Form.Item label="Total Price">
            <div style={{ color: "green" }}>${total}</div>
          </Form.Item>
          <Link
            onClick={handleBuy}
            // to="/check-out"
            style={{ textDecoration: "none" }}
          >
            <Button>Check Out</Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export default Cart;
