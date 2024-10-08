import React, { useEffect, useState } from "react";
import "./koi_breed-type.scss";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import api from "../../../config/axios";
import { addProduct } from "../../../redux/features/cartSlice";
import { toast } from "react-toastify";
function KoiBreedType() {
  const [koiList, setKoiList] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await api.get("koi?page=0&size=10");
      setKoiList(response.data.content);
      console.log(koiList);
    } catch (err) {
      toast.error("fetch error");
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="koi_list">
      {koiList.map((product) => (
        <Product product={product} />
      ))}
    </div>
  );
}
const Product = (product) => {
  // const dispatch = useDispatch();
  // const handleAddToCart = () => {
  //   dispatch(addProduct(product));
  // };
  return (
    <div className="product">
      <img
        className="product_img"
        src="https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b"
        alt=""
      />
      <p className="product_name">name:{product.name}</p>
      <p className="product_name">price:{product.price}</p>
      <p className="product_name">size:{product.size}</p>
      <Button>Add</Button>
    </div>
  );
};
export default KoiBreedType;
