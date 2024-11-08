/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./koi_breed-type.scss";
import { useDispatch, useSelector } from "react-redux";
import { Button, Drawer, Pagination, Tabs } from "antd";
import api from "../../../config/axios";
import { addProduct } from "../../../redux/features/cartSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { storeKoi } from "../../../redux/features/koiSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import Unique from "./compare_unique/unique";
import Lot from "./compare_lot/lot";
function KoiBreedType() {
  const [koiList, setKoiList] = useState([]);
  const breedId = useSelector((store) => store.breedId);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [isOpen, setIsOpen] = useState(false);
  const fetchProduct = async (breed) => {
    if (!breed) return; // Check if breedId exists before making the API call
    try {
      const response = await api.get(`koi?breedId=${breed}`);
      setKoiList(response.data); // Set the koi list data in the state
      console.log(koiList);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  useEffect(() => {
    fetchProduct(breedId);
  }, [breedId]);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentKoiList = koiList.slice(startIndex, endIndex);
  //unique or lot

  const items = [
    {
      key: "1",
      label: "Unique Koi",
      children: <Unique />,
    },
    {
      key: "2",
      label: "Koi Lot",
      children: <Lot />,
    },
  ];

  return (
    <div className="koi_breed_fetch">
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Compare
      </Button>
      <div className="koi_list">
        {currentKoiList.map((item) => (
          <Product products={item} key={item.id} />
        ))}
      </div>
      <Pagination
        className="page"
        current={currentPage}
        pageSize={pageSize}
        total={koiList.length}
        onChange={(page) => setCurrentPage(page)}
      />
      <Drawer
        open={isOpen}
        className="form_handle"
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Drawer>
    </div>
  );
}
const Product = ({ products }) => {
  const [isDisable, setIsDisable] = useState(false);
  const user = useSelector((store) => store.user);
  const items = useSelector((store) => store.cart);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const checkExist = () => {
    const exists = items.some(
      (item) => String(item.id) === String(products.id)
    );
    if (exists) {
      setIsDisable(true);
    }
  };
  const checkKoiLot = (koi) => {
    if (koi.quantity > 1) {
      return (
        <div className="koiLot">
          <div className="koilot_sign">Lot</div>
        </div>
      );
    }
  };
  const checkQuantity = (koi) => {
    if (koi.quantity > 1) {
      return <div className="koi_quan">Quantity: {koi.quantity}</div>;
    }
  };
  useEffect(() => {
    checkExist();
  }, [items]);
  const handleAddToCart = () => {
    if (user) {
      dispatch(addProduct(products));
    } else {
      nav("/login");
    }
  };
  const handleCheckSalePrice = (salePrice, price, salePercentage) => {
    if (salePrice > 0) {
      return (
        <div>
          <div style={{ textDecoration: "line-through", color: "#aaa" }}>
            {price} VNĐ
          </div>
          <div style={{ display: "flex", fontSize: "20px" }}>
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
    <div
      className="product"
      data-aos="zoom-in-down"
      data-aos-anchor-placement="top-bottom"
    >
      <Link
        onClick={() => {
          try {
            dispatch(storeKoi(products));
          } catch (err) {
            console.log(err);
          }
        }}
        to="/koi-detail"
        style={{
          textDecoration: "none",
          color: "#000",
        }}
      >
        {checkKoiLot(products)}
        <img
          className="product_img"
          src={products?.images}
          alt={products?.name}
        />
      </Link>
      <p className="product_name">Name: {products?.name}</p>
      <p className="product_name">Size: {products?.size}cm</p>
      {checkQuantity(products)}
      <div style={{ height: "100px" }}>
        <p className="product_name" style={{ display: "flex" }}>
          Breeds:
          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {products?.breeds?.map((breedItem) => {
              return (
                <div
                  key={breedItem}
                  style={{
                    marginRight: "10px",
                    fontWeight: "700",
                  }}
                >
                  {breedItem}
                </div>
              );
            })}
          </div>
        </p>

        <p className="product_name">
          {handleCheckSalePrice(
            products.salePrice,
            products.price,
            products.salePercentage
          )}{" "}
        </p>
      </div>
      <button
        onClick={handleAddToCart}
        className="Add_btn"
        disabled={isDisable}
      >
        <span className="Add_btn_value">Add to cart</span>
      </button>
    </div>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const fetchProduct = KoiBreedType.fetchProduct;
export default KoiBreedType;
