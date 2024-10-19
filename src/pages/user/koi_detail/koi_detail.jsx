import { ConfigProvider, Image, Input, Rate, Tabs } from "antd";
import { useEffect, useState } from "react";
import "./koi_detail.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../config/axios";
function KoiDetail() {
  const { TextArea } = Input;
  const [submitFeedback, setSubmitFeedback] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const koiDetail = useSelector((store) => store.koi);
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);
  const shopId = 1;
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

  const fetchFeedback = async () => {
    try {
      const response = await api.get("feedback");
      console.log(response.data);
      setSubmitFeedback(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleSubmitFeedback = async () => {
    if (!content.trim()) {
      toast.error("Please enter feedback before posting.");
      return;
    }
    const feedback = { content, rating, shopId };
    try {
      const response = await api.post(`feedback`, feedback);
      console.log("Feedback content:", content);
      console.log("Feedback rating:", rating);
      setSubmitFeedback((prevFeedback) => [...prevFeedback, response.data]);
      toast.success("Post Successfully!");
      setContent("");
      setRating(0);
    } catch (err) {
      console.error("Error posting feedback:", err);
      toast.error(err.response?.data || "Failed to post feedback");
    }
  };

  const items = [
    {
      key: "1",
      label: "Feedback",
      children: (
        <div>
          <TextArea
            name="content"
            placeholder="Enter your feedback"
            rows={4}
            style={{ width: "800px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></TextArea>
          <div>
            <Rate
              name="rating"
              value={rating}
              onChange={(value) => setRating(value)}
            />
          </div>
          <button className="post-btn" onClick={handleSubmitFeedback}>
            Post
          </button>
          <div>
            {submitFeedback.length > 0 ? (
              submitFeedback.map((feedback) => (
                <div key={feedback.id || feedback.content}>
                  <p>{feedback.content}</p>
                  <Rate disabled value={feedback.rating} />
                </div>
              ))
            ) : (
              <p>No feedback yet. Be the first to post!</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Certificate",
      children: (
        <div className="certificate" style={{ height: "800px" }}>
          <Image src={koiDetail.certificate.imageUrl} width={500} style={{ height: "100%" }} alt="" />
        </div>
      ),
    },
  ];
  return (
    <div className="koi-item">
      <div className="KoiDetail row">
        <div className="col-md-6">
          <Image
            className="imgMain"
            src={koiDetail.images}
            style={{ width: "600px", height: "500px", objectFit: "cover" }}
          ></Image>
          {koiDetail.imagesList.map((img) => { return <Image key={img} src={img} width={100} height={100} style={{ display: "flex", padding: "10px" }}></Image> })}
        </div>
        <div className="koi-detail col-md-6">
          <h1 className="koi-detail_name">{koiDetail.name}</h1>
          <h3 className="koi-detail_price">${koiDetail.price}</h3>
          <h3 className="koi-detail_gender">gender: {koiDetail.gender}</h3>
          <h3 className="koi-detail_origin">origin: {koiDetail.origin}</h3>
          <h3 className="koi-detail_vendor">vendor: {koiDetail.vendor}</h3>
          <h3 className="koi-detail_size">size: {koiDetail.size}</h3>
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
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              /* here is your component tokens */
              inkBarColor: "#000",
              itemSelectedColor: "#000",
              itemHoverColor: "#aaa",
            },
          },
        }}
      >
        <div className="certificate-session">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </ConfigProvider>
    </div >
  );
}

export default KoiDetail;
