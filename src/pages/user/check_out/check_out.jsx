import "./check_out.css";
import { Button, Image, Input } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Outlet, useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import { toast } from "react-toastify";
function CheckOut() {
  const [promoCode, setPromoCode] = useState("");
  const [voucherList, setVoucherList] = useState([]);
  const nav = useNavigate();
  const cartItems = useSelector((store) => store.selectedItems);
  const handleCheckDeposit = () => {
    const check = document.getElementById("depositCheckbox");
    check.addEventListener("change", function () {
      if (this.checked) {
        nav("check-out-consignment");
      } else {
        nav("/check-out");
      }
    });
  };
  const fetchVoucher = async () => {
    try {
      const res = await api.get("voucher");
      console.log(res);
      setVoucherList(res.data);
    } catch (err) {
      toast.error(err.res.data);
    }
  };
  const cart = useSelector((store) => store.cart);
  const details = useSelector((store) => store.checkout);
  const handelSubmitOrder = async () => {
    try {
      console.log(details);
      const val = {
        detail: details,
        // voucherCode: promoCode,
      };
      console.log({ val });
      const response = await api.post("order", val);
      console.log(response.data);
      console.log(cart);
      // window.open(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const total = cartItems.reduce((total, item) => total + item.price, 0);
  var finalPrice = total;
  return (
    <div className="CheckOut row">
      <div className="col-md-8 userInfo">
        <h1>Check Out</h1>
        <div className="deposit">
          <div>Deposit this Koi fish to the farm</div>
          <label className="switch" onClick={handleCheckDeposit}>
            <input type="checkbox" id="depositCheckbox" />
            <span className="slider round"></span>
          </label>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      <div className="col-md-4 sumary" id="side" style={{ display: "none" }}>
        <h3>Summary</h3>
        <div className="summary_price">
          <p style={{ display: "flex" }}>
            Estimated price:
            <p style={{ color: "green" }}>{total} VNĐ</p>
          </p>
          <p style={{ display: "flex" }}>
            Discount:
            {voucherList.map((voucher) => {
              if (voucher.code === promoCode) {
                {
                  finalPrice = (finalPrice * voucher.discountValue) / 100;
                }
                return <div key={voucher.code}>{voucher.discountValue}% </div>;
              }
            })}
          </p>
        </div>
        <div className="sumary_totalPrice">
          <p style={{ fontWeight: "600", fontSize: "20px" }}>
            Total Price: {finalPrice} VNĐ{" "}
          </p>
          <div className="row" style={{ padding: " 0px 14px" }}>
            <Input
              type="text"
              className="sumary_totalPrice_input col-md-8"
              name=""
              placeholder="Promo code"
              onChange={(e) => setPromoCode(e.target.value)} // Update state on input change
              value={promoCode}
            />
            <button
              className="sumary_totalPrice_btn col-md-4"
              onClick={() => {
                console.log(promoCode);
                fetchVoucher();
              }}
            >
              Apply
            </button>
          </div>
        </div>
        <div className="sumary_cart_items">
          <h6>Items:</h6>
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
        <Button onClick={handelSubmitOrder}>Purchase</Button>
      </div>
    </div>
  );
}

export default CheckOut;
