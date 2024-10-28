import { ConfigProvider, Image, Input, Rate, Tabs } from "antd";
import { useEffect, useState } from "react";
import "./koi_detail.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import AOS from "aos";
import "aos/dist/aos.css";
function KoiDetail() {
  const { TextArea } = Input;
  const [isDisable, setIsDisable] = useState(false);
  const koiDetail = useSelector((store) => store.koi);
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleAddToCart = () => {
    if (user) {
      dispatch(addProduct(koiDetail));
    } else {
      nav("/login");
    }
  };
  const checkExist = () => {
    console.log(koiDetail);
    const exists = cart.some(
      (item) => String(item.id) === String(koiDetail.id)
    );
    if (exists) {
      setIsDisable(true);
    }
  };
  useEffect(() => {
    checkExist();
  }, [cart]);
  const onChange = (key) => {
    console.log(key);
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const handleCheckSalePrice = (salePrice, price, salePercentage) => {
    if (salePrice > 0) {
      return (
        <div>
          <div style={{ textDecoration: "line-through", color: "#aaa" }}>
            {price} VNĐ
          </div>
          <div style={{ display: "flex", fontSize: "40px" }}>
            {salePrice} VNĐ{" "}
            <div
              style={{
                color: "red",
                marginLeft: "20px",
                fontWeight: "500",
              }}
            >
              -{salePercentage}%
            </div>
          </div>
        </div>
      );
    } else {
      return <div style={{ fontSize: "20px" }}>{price} VNĐ</div>;
    }
  };
  return (
    <div className="koi-item">
      <div className="KoiDetail row">
        <div className="col-md-6">
          <Image
            className="imgMain"
            src={koiDetail.images}
            style={{ width: "600px", height: "500px", objectFit: "cover" }}
          ></Image>
          {koiDetail.imagesList.map((img) => {
            return (
              <Image
                key={img}
                src={img}
                width={100}
                height={100}
                style={{ display: "flex", padding: "10px" }}
              ></Image>
            );
          })}
        </div>
        <div className="koi-detail col-md-6">
          <h1 className="koi-detail_name">{koiDetail.name}</h1>
          <h3 className="koi-detail_price">
            {handleCheckSalePrice(
              koiDetail.salePrice,
              koiDetail.price,
              koiDetail.salePercentage
            )}
          </h3>
          <h3 className="koi-detail_gender">Gender: {koiDetail.gender}</h3>
          <h3 className="koi-detail_origin">Origin: {koiDetail.origin}</h3>
          <h3 className="koi-detail_vendor">Vendor: {koiDetail.vendor}</h3>
          <h3 className="koi-detail_size">Size: {koiDetail.size}</h3>
          <h3 className="koi-detail_description">
            description: {koiDetail.description}
          </h3>
          <button
            id="btn"
            className="koi-detail_button"
            onClick={handleAddToCart}
            disabled={isDisable}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default KoiDetail;
