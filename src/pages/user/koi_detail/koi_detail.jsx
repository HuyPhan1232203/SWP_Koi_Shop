import { Button, Image } from "antd";
import React from "react";
import "./koi_detail.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
function KoiDetail() {
  const koiDetail = useSelector((store) => store.koi);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  console.log(koiDetail);
  const handleAddToCart = () => {
    if (user) {
      dispatch(addProduct(koiDetail));
    } else {
      nav("/login");
    }
  };
  return (
    <div className="KoiDetail row">
      <div className="col-md-6">
        <Image
          src={koiDetail.images}
          style={{ width: "600px", height: "500px", objectFit: "cover" }}
        ></Image>
      </div>
      <div className="koi-detail col-md-6">
        <h1 className="koi-detail_name">{koiDetail.name}</h1>
        <h3 className="koi-detail_gender">gender: {koiDetail.gender}</h3>
        <h3 className="koi-detail_price">${koiDetail.price}</h3>
        <h3 className="koi-detail_origin">origin: {koiDetail.origin}</h3>
        <h3 className="koi-detail_vendor">vendor: {koiDetail.vendor}</h3>
        <h3 className="koi-detail_size">size: {koiDetail.size}</h3>
        <h3 className="koi-detail_description">
          description: {koiDetail.description}
        </h3>
        <button className="koi-detail_button" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default KoiDetail;
