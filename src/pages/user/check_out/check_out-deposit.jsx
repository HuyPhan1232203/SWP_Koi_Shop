import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import api from "../../../config/axios";
import { storeProduct } from "../../../redux/features/checkoutcart";
import AOS from "aos";
import "aos/dist/aos.css";
import moment from "moment";
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
    console.log(value);
    console.log(careType);
    careType.map((care) => {
      if (care.careTypeId === value.careTypeId) {
        sessionStorage.setItem("careType", care.costPerDay);
        // console.log(care.costPerDay);
      }
    });
    const side = document.getElementById("side");
    side.style.display = "block";
    try {
      const selectedItems = cartItems;
      const details = selectedItems.map((item) => ({
        koiId: item.id,
      }));
      // const values = {
      //   detail: details,
      // };
      sessionStorage.setItem("description", value.description);
      sessionStorage.setItem("endDate", value.endDate.toISOString());
      sessionStorage.setItem("careTypeId", value.careTypeId);
      sessionStorage.setItem(
        "address",
        `${value.address}, ${value.district}, ${value.city}`
      );
      // describe: value.description,
      // endDate: value.endDate.toISOString(),
      // careTypeId: value.careTypeId,
      console.log(details);
      dispatch(storeProduct(details));
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const disablePastDates = (current) => {
    const minDate = moment().add(1, "days").startOf("day");
    return current && current < minDate;
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
                    <p>{formatCurrency(item.costPerDay)}VNĐ/day </p>
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
          <div className="address">
            <div className="row">
              <Form.Item
                name="district"
                rules={[
                  {
                    required: true,
                    message: "Please Input",
                  },
                ]}
                label="District"
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
                initialValue={userInfo.address}
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please Input",
                  },
                ]}
                label="Address"
                className="col-md-4"
              >
                <Input></Input>
              </Form.Item>
            </div>
          </div>
        </div>
        <Form.Item labelCol={{ span: 9 }} label="End date" name="endDate">
          <DatePicker disabledDate={disablePastDates} />
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
