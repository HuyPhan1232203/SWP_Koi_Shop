import { useState } from "react";
import "./cart.css";
import { Button, Form, Image, Input, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAll, removeProduct } from "../../../redux/features/cartSlice";
import api from "../../../config/axios";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  addSelectedItem,
  clearAllSelectedItem,
} from "../../../redux/features/selectedItemsSlice";

function Cart() {
  const itemSelected = useSelector((store) => store.selectedItems);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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

  const handleBuy = async () => {
    try {
      dispatch(clearAllSelectedItem());
      const selectedItems = data.filter((koi) =>
        selectedRowKeys.includes(koi.id)
      );
      selectedItems.map((item) => {
        dispatch(addSelectedItem(item));
      });
      const detail = selectedItems.map((koi) => ({
        koiId: koi.id,
        price: koi.price,
      }));
    } catch (err) {
      toast.error("Failed");
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
          <Form.Item label="Items: "></Form.Item>
          <Form.Item label="Shipping: ">
            <Select>
              <Select.Option>Standard Delivery</Select.Option>
              <Select.Option>Expert Delivery</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Voucher">
            <Input placeholder="Enter your voucher code"></Input>
          </Form.Item>
          <Form.Item label="Total Price"></Form.Item>
          <Button>
            <Link
              onClick={handleBuy}
              to="/check-out"
              style={{ textDecoration: "none" }}
            >
              Check Out
            </Link>
          </Button>
        </Form>
      </div>
    </div>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export default Cart;
