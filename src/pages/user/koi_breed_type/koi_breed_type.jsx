import React, { useEffect, useState } from "react";
import "./koi_breed-type.scss";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import api from "../../../config/axios";
import { addProduct } from "../../../redux/features/cartSlice";
import { toast } from "react-toastify";
function KoiBreedType() {
  const [koiList, setKoiList] = useState([]);
  const breedId = sessionStorage.getItem("breedId");
  const fetchProduct = async (breed) => {
    if (!breed) return; // Check if breedId exists before making the API call
    try {
      const response = await api.get(`koi?breedId=${breed}&page=0&size=10`);
      setKoiList(response.data); // Set the koi list data in the state
      console.log(koiList);
    } catch (err) {
      toast.error("fetch error");
    }
  };
  useEffect(() => {
    fetchProduct(breedId);
  }, [breedId]);
  //BULK KOI
  const handleFetchKoiLot=()=>{
    
  }
  // const checkChangeBreed = (breedIDstate) => {
  //   if(breedIDstate!=breedId)
  // };
  return (
    <div className="koi_breed_fetch">
      <div className="changer_btn">
        <Button className="koilot">Bulk Koi Fish</Button>
        <Button className="koi">Single Koi Fish</Button>
      </div>
      <div className="koi_list">
        {koiList.map((product) => (
          <Product product={product} />
        ))}
      </div>
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
export const fetchProduct = KoiBreedType.fetchProduct;
export default KoiBreedType;
