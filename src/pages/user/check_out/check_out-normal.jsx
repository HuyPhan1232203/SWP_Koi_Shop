import { Button, Form, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { storeProduct } from "../../../redux/features/checkoutcart";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function CheckOutNormal() {
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.selectedItems);
  const nav = useNavigate();
  console.log(cartItems);
  console.log(userInfo);
  const handleShowSide = () => {
    const btn = document.getElementById("continue");
    const side = document.getElementById("side");
    btn.addEventListener("click", () => {
      side.style.display = "block";
    });
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const handelSubmitOrder = async () => {
    try {
      const selectedItems = cartItems;
      const detail = selectedItems.map((item) => ({
        koiId: item.id,
      }));
      console.log({ detail });
      dispatch(storeProduct(detail));
    } catch (err) {
      toast.error("err");
    }
  };
  return (
    <div data-aos="fade-left">
      <Form
        labelCol={{ span: 24 }}
        className="userInfo_input"
        onFinish={() => {
          handleShowSide();
          handelSubmitOrder();
        }}
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
            name="ship"
            rules={[
              {
                required: true,
                message: "Please Input",
              },
            ]}
            label="Shipping"
          >
            <Radio.Group name="radiogroup" className="radio_delivery">
              <Radio value="Standard" className="delivery">
                <div className="delivery_item ">Standard Delivery</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "103%",
                  }}
                >
                  <div style={{ color: "#fff" }}>3-4</div>
                  <div style={{ color: "#fff" }}> days via Fedex</div>
                </div>
              </Radio>
              <Radio value="Express" className="delivery">
                <div className="delivery_item ">Express Delivery</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "103%",
                  }}
                >
                  <div style={{ color: "#fff" }}>1-2</div>
                  <div style={{ color: "#fff" }}> days via post</div>
                </div>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="address">
          <div className="row">
            <Form.Item
              initialValue={userInfo.address}
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please Input",
                },
              ]}
              label="Address"
              className="col-md-8"
            >
              <Input placeholder="Type here"></Input>
            </Form.Item>
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please Input",
                },
              ]}
              label="City"
              className="col-md-4"
            >
              <Select>
                <Select.Option value="HCM">Ho Chi Minh</Select.Option>
                <Select.Option value="HN">Ha Noi</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="row">
            <Form.Item
              name="house"
              rules={[
                {
                  required: true,
                  message: "Please Input",
                },
              ]}
              label="House"
              className="col-md-4"
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="postal"
              rules={[
                {
                  required: true,
                  message: "Please Input",
                },
              ]}
              label="Postal code"
              className="col-md-4"
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="zip"
              rules={[
                {
                  required: true,
                  message: "Please Input",
                },
              ]}
              label="Zip"
              className="col-md-4"
            >
              <Input></Input>
            </Form.Item>
          </div>
        </div>
        <div className="message">
          <Form.Item name="message" label="Message to shop">
            <TextArea rows={4}></TextArea>
          </Form.Item>
        </div>
        <Button htmlType="submit" id="continue">
          Continue
        </Button>
      </Form>
    </div>
  );
}

export default CheckOutNormal;
