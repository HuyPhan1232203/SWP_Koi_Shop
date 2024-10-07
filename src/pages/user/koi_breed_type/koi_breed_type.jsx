import React, { useEffect, useState } from "react";
import "./koi_breed-type.scss";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import api from "../../../config/axios";
import { addProduct } from "../../../redux/features/cartSlice";
function KoiBreedType() {
  const [products, setProduct] = useState([]);

  const fetchProduct = async () => {
    const response = await api.get("koi");
    setProduct(response.data.content);
    console.log(response.data.content);
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  // return (
  //   <div className="koi_list">
  //     {products.map((product) => (
  //       <Product product={product} />
  //     ))}
  //   </div>
  // );
}
// const Product = (product) => {
//   const dispatch = useDispatch();
//   const handleAddToCart = () => {
//     dispatch(addProduct(product));
//   };
//   return (
//     <div className="product">
//       <img src="" alt="" />
//       <p>product.name</p>
//       <p>product.name</p>
//       <p>product.name</p>
//       <Button onClick={handleAddToCart()}>Add</Button>
//     </div>
//   );
// };
export default KoiBreedType;
