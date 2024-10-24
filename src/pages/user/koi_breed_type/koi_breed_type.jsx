import { useEffect, useState } from "react";
import "./koi_breed-type.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ConfigProvider,
  Form,
  Layout,
  Modal,
  Pagination,
  Select,
} from "antd";
import api from "../../../config/axios";
import { addProduct } from "../../../redux/features/cartSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { storeKoi } from "../../../redux/features/koiSlice";

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
      toast.error("fetch error");
    }
  };
  useEffect(() => {
    fetchProduct(breedId);
  }, [breedId]);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentKoiList = koiList.slice(startIndex, endIndex);
  const [form] = Form.useForm();
  const handleCompare = (value) => {
    console.log(value);
  };
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
      <Modal
        open={isOpen}
        className="form_handle"
        onCancel={() => {
          setIsOpen(false);
        }}
        onOk={form.submit}
      >
        <Form form={form} onFinish={handleCompare}>
          <Form.Item
            label="Item 1 "
            name="a"
            rules={[{ required: true, message: "please choose" }]}
          >
            <Select>
              {koiList.map((koi) => {
                return <Select.Option key={koi.id}>{koi.name}</Select.Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Item 2 "
            name="b"
            rules={[{ required: true, message: "please choose" }]}
          >
            <Select>
              {koiList.map((koi) => {
                return <Select.Option key={koi.id}>{koi.name}</Select.Option>;
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
const Product = ({ products }) => {
  const [isDisable, setIsDisable] = useState(false);
  const user = useSelector((store) => store.user);
  const items = useSelector((store) => store.cart);
  const nav = useNavigate();
  const dispatch = useDispatch();
  console.log(products);
  const checkExist = () => {
    const exists = items.some(
      (item) => String(item.id) === String(products.id)
    );
    if (exists) {
      setIsDisable(true);
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

  return (
    <div className="product">
      <Link
        onClick={() => {
          try {
            dispatch(storeKoi(products));
          } catch (err) {
            console.log("err");
          }
        }}
        to="/koi-detail"
        style={{
          textDecoration: "none",
          color: "#000",
        }}
      >
        <img
          className="product_img"
          src={products?.images}
          alt={products?.name}
        />
      </Link>
      <p className="product_name">Name: {products?.name}</p>
      <p className="product_name">Size: {products?.size}</p>
      <div style={{ height: "100px" }}>
        <p className="product_name" style={{ display: "flex" }}>
          Breeds:
          <div
            style={{
              display: "flex",
              // justifyContent: "space-around",
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
        <p className="product_name">Price: {products?.price}</p>
      </div>
      <Button
        onClick={handleAddToCart}
        className="Add_btn"
        disabled={isDisable}
      >
        <span className="Add_btn_value">Add to cart</span>
      </Button>
    </div>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const fetchProduct = KoiBreedType.fetchProduct;
export default KoiBreedType;
