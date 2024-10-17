import "./check_out.css";
import { Image, Input } from "antd";
import { useSelector } from "react-redux";

import { Outlet, useNavigate } from "react-router-dom";
function CheckOut() {
  const nav = useNavigate();
  const cartItems = useSelector((store) => store.selectedItems);
  const handleCheckDeposit = () => {
    const check = document.getElementById("depositCheckbox");
    check.addEventListener("change", function () {
      if (this.checked) {
        nav("check-out_deposit");
      } else {
        nav("/check-out");
      }
    });
  };
  const total = cartItems.reduce((total, item) => total + item.price, 0);
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
      <div className="col-md-4 sumary">
        <h3>Summary</h3>
        <div className="summary_price">
          <p style={{ display: "flex" }}>
            Estimated price:
            <p style={{ color: "green" }}>${total} </p>
          </p>
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
      </div>
    </div>
  );
}

export default CheckOut;
