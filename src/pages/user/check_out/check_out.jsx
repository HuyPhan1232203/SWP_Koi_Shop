import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./check_out.css";
import { Button, Form, Image, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { render } from "@testing-library/react";
import { toast } from "react-toastify";
import api from "../../../config/axios";
function CheckOut() {
  const userInfo = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.selectedItems);
  console.log(cartItems);
  console.log(userInfo);
  const handelSubmitOrder = () => {
    try {
      const selectedItems = cartItems;
    } catch (err) {
      toast;
    }
  };
  return (
    <div className="CheckOut row">
      <div className="col-md-8 userInfo">
        <h1>Check Out</h1>
        <div>
          <Form
            labelCol={{ span: 24 }}
            className="userInfo_input"
            onFinish={handelSubmitOrder}
          >
            <div className="user_info_contain">
              <Form.Item label="Username" className="userInfo_input_field">
                <Input defaultValue={userInfo.username}></Input>
              </Form.Item>
              <Form.Item label="Phone" className="userInfo_input_field">
                <Input defaultValue={userInfo.phone}></Input>
              </Form.Item>
              <Form.Item label="Email" className="userInfo_input_field">
                <Input defaultValue={userInfo.email}></Input>
              </Form.Item>
            </div>
            <div className="shipping ">
              <Form.Item label="Shipping">
                <Radio.Group name="radiogroup" className="radio_delivery">
                  <Radio value="Standard" className="delivery">
                    <div className="delivery_item ">Standard Delivery</div>
                    <small>3-4 days via Fedex</small>
                  </Radio>
                  <Radio value="Express" className="delivery">
                    <div className="delivery_item ">Express Delivery</div>
                    <small>1-2 days via post</small>
                  </Radio>
                  <Radio value="Self" className="delivery">
                    <div className="delivery_item ">Self Pickup</div>
                    <small>Come to our shop</small>
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="address">
              <div className="row">
                <Form.Item label="Address" className="col-md-8">
                  <Input placeholder="Type here"></Input>
                </Form.Item>
                <Form.Item label="City" className="col-md-4">
                  <Select>
                    <Select.Option value="HCM">Ho Chi Minh</Select.Option>
                    <Select.Option value="HN">Ha Noi</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="row">
                <Form.Item label="House" className="col-md-4">
                  <Input></Input>
                </Form.Item>
                <Form.Item label="Postal code" className="col-md-4">
                  <Input></Input>
                </Form.Item>
                <Form.Item label="Zip" className="col-md-4">
                  <Input></Input>
                </Form.Item>
              </div>
            </div>
            <div className="message">
              <Form.Item label="Message to shop">
                <TextArea rows={4}></TextArea>
              </Form.Item>
            </div>
            <Button>Continue</Button>
          </Form>
        </div>
      </div>
      <div className="col-md-4 sumary">
        <h3>Summary</h3>
        <div className="summary_price">
          <p>Total price: </p>
          <p>Discount: </p>
          <p>Shipping cost: </p>
        </div>
        <div className="sumary_totalPrice">
          <p>Total Price:</p>
          <div className="row" style={{ padding: " 0px 14px" }}>
            <Input
              type="text"
              className="sumary_totalPrice_input col-md-8"
              name=""
              placeholder="Promo code"
            />
            <button className="sumary_totalPrice_btn col-md-4">Apply</button>
          </div>
        </div>
        <div className="sumary_cart_items">
          {cartItems.map((item) => {
            return (
              <div key={item.id} className="item">
                <div className="item_name">
                  <Image
                    src={item.images}
                    style={{
                      width: "100px",
                      height: "80px",
                      margin: " 0 20px",
                    }}
                  ></Image>
                </div>
                <div className="item_detail">
                  <div className="item_name">{item.name}</div>
                  <small className="item_price">price: {item.price}</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
