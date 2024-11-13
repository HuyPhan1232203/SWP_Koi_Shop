import "./check_out.css";
import { Button, Image, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Outlet, useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import { storeOrder } from "../../../redux/features/orderedProduct";
function CheckOut() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
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
  const description = sessionStorage.getItem("description");
  const address = sessionStorage.getItem("address");
  const details = useSelector((store) => store.checkout);
  var careTypeId = sessionStorage.getItem("careTypeId");
  const endDate = sessionStorage.getItem("endDate");
  const handelSubmitOrder = async () => {
    try {
      var val = [];
      var response = "";
      if (promoCode != "") {
        val = {
          detail: details,
          voucherCode: promoCode,
          description: description,
          address: address,
          careTypeId: careTypeId,
          endDate: endDate,
        };
      } else {
        val = {
          detail: details,
          description: description,
          address: address,
          careTypeId: careTypeId,
          endDate: endDate,
        };
      }

      if (careTypeId != null) {
        response = await api.post("consignmentOrder", val);
        console.log(response.data);
        dispatch(storeOrder(val.detail));
      } else {
        console.log("normal");
        response = await api.post("order", val);
        console.log(response.data);
        dispatch(storeOrder(val));
      }
      console.log(response.data);
      window.open(response.data);
      nav(0);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      careTypeId = null;
    }
  };
  const carePrice = sessionStorage.getItem("careType");
  useEffect(() => {
    DateDifference();
  }, [carePrice, endDate]);
  const [daysDifference, setDayDifference] = useState(0);
  const DateDifference = () => {
    // console.log(details.endDate);
    const specificDate = new Date(endDate);
    const currentDate = new Date();

    // Set the time to midnight for both dates to ignore hours, minutes, and seconds
    specificDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Calculate difference in days
    const timeDifference = specificDate - currentDate;
    setDayDifference(
      Math.floor(timeDifference / (1000 * 60 * 60 * 24)) * carePrice
    );
  };
  const total = cartItems.reduce((total, item) => total + item.price, 0);
  var finalPrice = total + (daysDifference * cartItems.length || 0);
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
      <div className="col-md-4 sumary" id="side">
        <h3 style={{ color: "#000" }}>Summary</h3>
        <div className="summary_price">
          <p style={{ display: "flex", color: "#000" }}>
            Estimated price:
            <p style={{ color: "green" }}>{formatCurrency(total)}VNĐ</p>
          </p>
          <p style={{ display: "flex", color: "#000" }}>
            Discount:
            {voucherList.map((voucher) => {
              if (voucher.code === promoCode) {
                {
                  finalPrice =
                    (finalPrice - (daysDifference * cartItems.length || 0)) *
                      ((100 - voucher.discountValue) / 100) +
                    (daysDifference * cartItems.length || 0);
                }
                return (
                  <div style={{ color: "#000" }} key={voucher.code}>
                    {voucher.discountValue}%{" "}
                  </div>
                );
              }
            })}
          </p>
        </div>
        <div className="sumary_totalPrice">
          <p style={{ fontWeight: "600", fontSize: "20px", color: "#000" }}>
            Total Price: {formatCurrency(finalPrice)}VNĐ
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
        <div
          className="sumary_cart_items"
          style={{ height: "300px", overflowY: "auto" }}
        >
          <h6 style={{ color: "#000" }}>Items:</h6>
          {cartItems.map((item) => {
            return (
              <div key={item.id} className="item" style={{ color: "#000" }}>
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
                  <small className="item_price">
                    price: {formatCurrency(item.price)}VNĐ
                  </small>
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
