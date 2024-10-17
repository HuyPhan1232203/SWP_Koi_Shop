import { Button, ConfigProvider, Image, Input, Rate, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import "./koi_detail.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import api from "../../../config/axios";
function KoiDetail() {
  const { TextArea } = Input;
  const [submitFeedback, setSubmitFeedback] = useState([]);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const koiDetail = useSelector((store) => store.koi);
  const user = useSelector((store) => store.user);
  const shopId = 1;
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
      children: <div>Content of Tab Pane 2</div>,
    },
  ];
  return (
    <div className="koi-item">
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

      <div className="certificate-session">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
}

export default KoiDetail;
