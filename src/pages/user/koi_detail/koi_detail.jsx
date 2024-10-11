import { Button, Image } from "antd";
import React from "react";
import "./koi_detail.css";
import { useSelector } from "react-redux";
function KoiDetail() {
  const koiDetail = useSelector((store) => store.koi);
  console.log(koiDetail);
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
        <button className="koi-detail_button">Add to cart</button>
      </div>
    </div>
  );
}

export default KoiDetail;
