import { DatePicker, Form, Input, Radio } from "antd";
import React from "react";

function ShowConsignOff() {
  return (
    <div>
      <Form>
        <Form.Item label="Address" name="address">
          <Input></Input>
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Form.Item label="Start date" name="startDate">
            <DatePicker />
          </Form.Item>
          <Form.Item label="End date" name="endDate">
            <DatePicker />
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
        
      </Form>
    </div>
  );
}

export default ShowConsignOff;
