import { useEffect, useState } from "react";
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
  const handleFetchKoiLot = async (breed) => {
    if (!breed) return; // Check if breedId exists before making the API call
    try {
      const response = await api.get(`koilot?page=0&size=20&breedId=${breed}`);
      setKoiList(response.data); // Set the koi list data in the state
      console.log(koiList);
    } catch (err) {
      toast.error("fetch error");
    }
  };
  return (
    <div className="koi_breed_fetch">
      <div className="changer_btn">
        <Button className="koilot">Bulk Koi Fish</Button>
        <Button className="koi">Single Koi Fish</Button>
      </div>
      <div className="koi_list">
        {koiList.map((product) => (
          <Product products={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
const Product = ({ products }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addProduct(products));
  };
  return (
    <div className="product">
      <img
        className="product_img"
        src="https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b"
        alt=""
      />
      <p className="product_name">Name: {products.name}</p>
      <p className="product_name">Price: {products.price}</p>
      <p className="product_name">Size: {products.size}</p>
      <Button onClick={handleAddToCart}>Add to cart</Button>
    </div>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const fetchProduct = KoiBreedType.fetchProduct;
export default KoiBreedType;
