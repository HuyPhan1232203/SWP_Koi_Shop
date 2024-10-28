import { useEffect, useState } from "react";
import "./cart.css";
import { Button, Form, Image, Input, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAll, removeProduct } from "../../../redux/features/cartSlice";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  addSelectedItem,
  clearAllSelectedItem,
} from "../../../redux/features/selectedItemsSlice";

function Cart() {
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
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (_, record) => {
        if (record.salePrice > 0) {
          {
            record.price = record.salePrice;
          }
          return (
            <div>
              {/* <div style={{ textDecoration: "line-through" }}>
                {record.price} VNĐ
              </div> */}
              <div>{record.salePrice} VNĐ </div>
            </div>
          );
        } else {
          return <div>{record.price} VNĐ</div>;
        }
      },
    },

    {
      title: "Delete",
      dataIndex: "id",
      render: (id) => {
        return (
          <Button
            className="delete-btn"
            type="primary"
            danger
            onClick={() => {
              handleDeleteKoi(id);
            }}
            style={{ padding: "0 5px" }}
          >
            <DeleteOutlined className="delete-icon" />
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
  var total = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const nav = useNavigate();
  const handleBuy = async () => {
    dispatch(clearAllSelectedItem());
    const selectedItems = data.filter((koi) =>
      selectedRowKeys.includes(koi.id)
    );
    if (selectedItems.length > 0) {
      try {
        selectedItems.map((item) => {
          dispatch(addSelectedItem(item));
        });
        nav("/check-out");
      } catch (err) {
        toast.error("Failed");
      }
    }
  };
  return (
    <div className="cart_page">
      <div className="cart_page_cart">
        <h1 className="cart_title text-center">Shopping Cart</h1>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={col}
          dataSource={data}
        ></Table>
        <Button className="clear-btn" onClick={() => dispatch(clearAll())}>
          Clear All
        </Button>
      </div>
      <div className="order_bill">
        <h3 className="order_bill_header">Sumary</h3>
        <Form labelCol={{ span: 24 }}>
          <div
            style={{
              marginTop: "40px",
              fontSize: "20px",
              fontWeight: "600",
              color: "#fff",
            }}
          >
            Items:
          </div>
          <Form.Item style={{ color: "#fff" }}>
            {selectedItems.map((item) => {
              return (
                <div style={{ fontWeight: "500" }} key={item.id}>
                  +{item.name}
                </div>
              );
            })}
          </Form.Item>
          <div style={{ color: "#fff" }}>Total price:</div>
          <Form.Item>
            <div
              style={{ color: "green", fontSize: "20px", fontWeight: "600" }}
            >
              {total} VNĐ
            </div>
          </Form.Item>
          <Link onClick={handleBuy} style={{ textDecoration: "none" }}>
            <Button className="check_out_btn">Check Out</Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export default Cart;
