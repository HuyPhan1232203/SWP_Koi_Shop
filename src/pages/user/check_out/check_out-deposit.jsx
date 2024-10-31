import { Button, DatePicker, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import api from "../../../config/axios";
import { storeProduct } from "../../../redux/features/checkoutcart";
import AOS from "aos";
import "aos/dist/aos.css";
function CheckOutConsignment() {
  const [form] = Form.useForm();
  const userInfo = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.selectedItems);
  const [careType, setCareType] = useState([]);
  //FETCH Care
  const fetchCareType = async () => {
    const response = await api.get("caretypes");
    console.log(response.data);
    setCareType(response.data);
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  useEffect(() => {
    fetchCareType();
  }, []);
  const dispatch = useDispatch();
  const handelSubmitOrder = async (value) => {
    const btn = document.getElementById("continue");
    const side = document.getElementById("side");
    btn.addEventListener("click", () => {
      side.style.display = "block";
    });
    console.log(value.endDate.$d);
    console.log(value.message);
    try {
      const selectedItems = cartItems;
      const details = selectedItems.map((item) => ({
        koiId: item.id,
      }));
      const values = {
        detail: details,
        describe: value.description,
        endDate: value.endDate.toISOString(),
        careTypeId: value.careTypeId,
      };
      console.log(values);
      dispatch(storeProduct(values));
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <div data-aos="fade-right">
      <Form
        labelCol={{ span: 24 }}
        className="userInfo_input"
        onFinish={handelSubmitOrder}
        form={form}
      >
        <div className="user_info_contain">
          <Form.Item
            initialValue={userInfo.username}
            name="name"
            rules={[
              {
                required: true,
                message: "Please Input",
              },
            ]}
            label="Username"
            className="userInfo_input_field"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            initialValue={userInfo.phone}
            name="phone"
            rules={[
              {
                required: true,
                message: "Please Input",
              },
            ]}
            label="Phone"
            className="userInfo_input_field"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            initialValue={userInfo.email}
            name="email"
            rules={[
              {
                required: true,
                message: "Please Input",
              },
            ]}
            label="Email"
            className="userInfo_input_field"
          >
            <Input></Input>
          </Form.Item>
        </div>
        <div className="shipping">
          <Form.Item
            className="care-form"
            name="careTypeId"
            rules={[
              {
                required: true,
                message: "Please Input",
              },
            ]}
            label="Care type:"
          >
            <Radio.Group name="radiogroup" className="radio_delivery">
              {careType.map((item) => {
                return (
                  <Radio
                    key={item.careTypeId}
                    value={item.careTypeId}
                    className="delivery"
                  >
                    <div className="delivery_item ">{item.careTypeName}</div>
                    <small>${item.costPerDay}/day</small>
                  </Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            className="care-form"
            label="Description:"
            name="description"
          >
            <TextArea></TextArea>
          </Form.Item>
        </div>
        <Form.Item>
          <Form.Item labelCol={{ span: 9 }} label="End date" name="endDate">
            <DatePicker />
          </Form.Item>
        </Form.Item>
        <div className="message">
          <Form.Item name="message" label="Message to shop">
            <TextArea rows={4}></TextArea>
          </Form.Item>
        </div>
        <Button id="continue" onClick={form.submit}>
          Continue
        </Button>
      </Form>
    </div>
  );
}

export default CheckOutConsignment;
