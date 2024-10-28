import "./check_out.css";
import { Button, Image, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Outlet, useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { clearAll, removeProduct } from "../../../redux/features/cartSlice";
import AOS from "aos";
import "aos/dist/aos.css";
function CheckOut() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
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
  const dispatch = useDispatch();
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
    console.log(details);
    try {
      var val = [];
      var response = "";
      if (promoCode != "") {
        val = {
          detail: details,
          voucherCode: promoCode,
        };
      } else {
        val = {
          detail: details,
        };
      }
      console.log(val.detail.detail);

      if (details.careTypeId) {
        console.log("consginment");
        console.log(details.careTypeId);
        response = await api.post("consignmentOrder", val.detail);
        console.log(response.data);
        val.detail.detail.map((value) => {
          dispatch(removeProduct(value?.koiId));
        });
      } else {
        console.log("normal");
        response = await api.post("order", val);
        console.log(response.data);
        val.detail.map((value) => {
          dispatch(removeProduct(value?.koiId));
        });
      }

      console.log(response.data);
      window.open(response.data);
      nav(0);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const total = cartItems.reduce((total, item) => total + item.price, 0);
  var finalPrice = total;
  return (
    <div className="CheckOut row" data-aos="fade-up">
      <div className="col-md-8 userInfo">
        <div className="checkout_header">Check Out</div>
        <div className="deposit">
          <div style={{ fontSize: "20px" }}>Consign to us</div>
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
                  finalPrice =
                    finalPrice - (finalPrice * voucher.discountValue) / 100;
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
        <Button className="purchase_btn" onClick={handelSubmitOrder}>
          Purchase
        </Button>
      </div>
    </div>
  );
}

export default CheckOut;
