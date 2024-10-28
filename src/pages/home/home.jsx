import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./home.css";
import "animate.css";
import {
  ArrowRightOutlined,
  DownOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Badge, Button, Carousel, message, Modal, Rate } from "antd";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { clearAll } from "../../redux/features/cartSlice";
import { clearAllSelectedItem } from "../../redux/features/selectedItemsSlice";
import { storeBreedId } from "../../redux/features/breedIdSlice";
import AOS from "aos";
import "aos/dist/aos.css";
function HomePage() {
  const nav = useNavigate();
  const userData = useSelector((store) => store.user);
  const [voucherList, setVoucherList] = useState([]);
  const cart = useSelector((store) => store.cart);
  const [openModal, setOpenModal] = useState(false);
  const [breed, setBreed] = useState([]);
  const dispatch = useDispatch();
  const koiSectionRef = useRef(null); // Create a ref for koi section
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleLogOut = () => {
    sessionStorage.removeItem("username");
    dispatch(logout());
    dispatch(clearAll());
    dispatch(clearAllSelectedItem());
    handleCloseModal();
    nav("/");
  };
  //CopyButton
  const CopyButton = (text) => {
    const copyText = () => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          message.success("Text copied to clipboard!");
        })
        .catch((error) => {
          message.error("Failed to copy text: " + error);
        });
    };

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // width: "50%",
          justifyContent: "center",
        }}
      >
        <button
          className="copy_btn"
          onClick={copyText}
          style={{
            margin: "0",
          }}
        >
          {/* <CopyOutlined /> */}
          Copy
        </button>
      </div>
    );
  };
  //VOUCHER
  const fetchVoucher = async () => {
    try {
      const res = await api.get("voucher");
      setVoucherList(res.data);
    } catch (err) {
      toast.error(err);
    }
  };
  //BREED
  const fetchBreed = async () => {
    try {
      const response = await api.get("breed");
      setBreed(response.data);
      console.log(breed);
    } catch (err) {
      toast.error(err + "fetch breed");
    }
  };
  //SHOW LIST BREED
  const breeds = (breed) => {
    return (
      <Link
        to="koi-list"
        className="koi_list_link"
        onClick={() => {
          console.log(breed.id);
          dispatch(storeBreedId(breed.id));
          // fetchProduct();
        }}
      >
        <li key={breed.id}>{breed.name}</li>
      </Link>
    );
  };
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  //USE EFFECT
  useEffect(() => {
    fetchBreed();
    authenticate(userData);
    fetchVoucher();
  }, []);
  //FORMAT DATE
  const StartDateDisplay = (startDate) => {
    const formattedDate = new Date(startDate).toLocaleString();
    return (
      <div>
        <div>{formattedDate}</div>
      </div>
    );
  };
  const [submitFeedback, setSubmitFeedback] = useState([]);
  //FETCH FEEDBACK
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

  const authenticate = (userData) => {
    console.log(userData);
    if (userData == null) {
      return (
        <div className="authenticate">
          <div className="authen_choice">
            <Link className="authen" to="/login">
              <UserOutlined />
              login /
            </Link>
            <Link className="authen" to="/register">
              register
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="authenticate">
          <div className="authen">
            User | {userData.username}
            <ul className="user_action">
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to="profile"
              >
                <li>My Profile</li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to="consign-history"
              >
                <li>My Consignment</li>
              </Link>
              <li onClick={handleOpenModal}>LogOut</li>
            </ul>
          </div>
          <div style={{ marginTop: "-7px" }}>
            <Link className="cart" to="/cart">
              <Badge count={cart.length}>
                <ShoppingCartOutlined
                  className="cart_icon"
                  style={{ fontSize: "32px", color: "#000", padding: "3px" }}
                />
              </Badge>
            </Link>
          </div>
        </div>
      );
    }
  };

  const showKoiBreed = () => {
    return breed?.map((breedItem) => {
      return (
        <div
          key={breedItem.id}
          className="koi-types"
          data-aos-duration="500"
          data-aos-delay="100"
          data-aos="fade-up"
        >
          <div className="koi-item">
            <img src={breedItem.imageUrl} alt="" />
            <h3>{breedItem.name}</h3>
            <button
              className="exploreBtn"
              onClick={() => {
                dispatch(storeBreedId(breedItem.id));
                nav("/koi-list");
              }}
            >
              Explore
            </button>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="homepage" style={{ backgroundColor: "#ef7f7" }}>
      <div className="header">
        <div className="headerbar">
          <div className="logo-container">
            <a href="/">
              <img
                style={{ objectFit: "contain" }}
                src="/assets/images/koi-logo.png"
                alt="Logo"
                className="logo"
              />
            </a>
            <div className="header_nav">
              <ul className="subnav">
                <li className="nav_li">
                  <Link className="nav_elements" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav_li">
                  <Link className="nav_elements" to="/consignment">
                    Consignment
                  </Link>
                </li>
                <li className="nav_li nav_li_koi">
                  <a
                    className="nav_elements"
                    onClick={() => {
                      scrollToSection("koiList");
                    }}
                  >
                    Koi List{" "}
                    <span className="arrow-down-icon">
                      <DownOutlined />
                    </span>
                  </a>
                  <ul className="nav_li_koi_elements">
                    {breed.map((breed) => breeds(breed))}
                    {/* {console.log(breed)} */}
                  </ul>
                </li>

                <Link
                  id="About"
                  to="about-us"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <li className="nav_li">About Us</li>
                </Link>
              </ul>

              {authenticate(userData)}
            </div>
          </div>
        </div>
        <Modal
          title="LogOut"
          open={openModal}
          onCancel={handleCloseModal}
          onOk={handleLogOut}
        >
          Are you sure want to log out?
        </Modal>
      </div>
      {location.pathname === "/" && (
        <div className="homepage-section container" data-aos="zoom-in-down">
          <Carousel autoplay>
            <div>
              <div
                className="homepage-design"
                style={{
                  background: "url('/assets/images/homepage-img-2.png')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="overlay"></div>
                <div>
                  <div className="row slider-text">
                    <div className="col-md-11 text-center-slider ">
                      <h1 className="mb-4 ">
                        Swim into Serenity: Find Your Perfect Koi!
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className="homepage-design"
                style={{
                  background: "url('/assets/images/homepage-img-4.jpg')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="overlay"></div>
                <div>
                  <div className="row slider-text">
                    <div className="col-md-11 text-center-slider ">
                      <h1 className="mb-4 ">
                        Swim into Serenity: Find Your Perfect Koi!
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className="homepage-design"
                style={{
                  background: "url('/assets/images/homepage-img-7.jpg')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="overlay"></div>
                <div>
                  <div className="row slider-text">
                    <div className="col-md-11 text-center-slider ">
                      <h1 className="mb-4 ">
                        Swim into Serenity: Find Your Perfect Koi!
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className="homepage-design"
                style={{
                  background: "url('/assets/images/homepage-img-5.webp')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="overlay"></div>
                <div>
                  <div className="row slider-text">
                    <div className="col-md-11 text-center-slider ">
                      <h1 className="mb-4 ">
                        Swim into Serenity: Find Your Perfect Koi!
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className="homepage-design"
                style={{
                  background: "url('/assets/images/homepage-img-6.jpg')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="overlay"></div>
                <div>
                  <div className="row slider-text">
                    <div className="col-md-11 text-center-slider ">
                      <h1 className="mb-4 ">
                        Swim into Serenity: Find Your Perfect Koi!
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel>
          <div className="koi-section" ref={koiSectionRef}>
            <div className="container">
              <div className="row koi-content-center">
                <div className="col-md-10 koi-center-heading text-center">
                  <a
                    onClick={() => {
                      scrollToSection("koiList");
                    }}
                    className="sub-heading"
                  >
                    <div>Our Kois</div>
                  </a>

                  <h2
                    style={{ marginBottom: "0" }}
                    data-aos-duration="500"
                    data-aos="fade-up-left"
                  >
                    Our Vouchers
                  </h2>
                  {/* <h5 style={{ color: "#aaa" }}>
                    Don't forget to use these vouchers while purchasing our
                    Kois!!!
                  </h5> */}

                  <div className="voucher_list ">
                    {voucherList.map((voucher) => {
                      return (
                        <div
                          key={voucher.id}
                          className="voucher "
                          data-aos-duration="500"
                          data-aos="fade-up"
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className="voucher_code">{voucher.code}</div>
                            <div className="voucher_discount">
                              {voucher.discountValue}%
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <div className="voucher_quanti">
                                Available: {voucher.quantity}
                              </div>
                            </div>
                            {CopyButton(voucher.code)}
                          </div>
                          <small className="voucher_date">
                            {StartDateDisplay(voucher.expiredDate)}
                          </small>
                        </div>
                      );
                    })}
                  </div>
                  <h2
                    id="koiList"
                    data-aos-duration="500"
                    data-aos="fade-up-left"
                  >
                    Explore our Kois
                  </h2>
                </div>

                <div className="koi_fetch_breed" id="koi">
                  {showKoiBreed()}
                </div>
              </div>
            </div>
          </div>
          {submitFeedback.length > 0 ? (
            submitFeedback.map((feedback) => (
              <div key={feedback.id || feedback.content} className="feedback">
                <div className="user-img">
                  <img src="/assets/images/user.png" width={60} alt="" />
                </div>
                <div style={{ lineHeight: "30px" }}>
                  <div
                    style={{
                      paddingRight: "50px",
                      color: "#007ACC",
                      fontWeight: "600",
                    }}
                  >
                    {feedback.username}
                  </div>
                  <div>{feedback.content}</div>
                  <Rate disabled value={feedback.rating} />
                </div>
              </div>
            ))
          ) : (
            <p>No feedback yet. Be the first to post!</p>
          )}
        </div>
      )}
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <div className="container-xl">
          <div
            className="row mb-5 justify-content-between"
            style={{ height: "100%" }}
          >
            <div className="col-md-4 col-lg mb-4">
              <div className="footer-widget">
                <div className="heading-footer">
                  <img
                    className="logo-footer"
                    src="/assets/images/koi-logo.png"
                    alt=""
                  />
                </div>
                <p className="slogan text-center ">
                  Swim into Serenity: Find Your Perfect Koi!
                </p>
                <ul className="footer-social list-unstyled">
                  <li>
                    <a href="">
                      <span className="social-icon">
                        <FacebookOutlined />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <span className="social-icon">
                        <YoutubeOutlined />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <span className="social-icon">
                        <InstagramOutlined />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-lg-2">
              <div className="footer-widget">
                <h2 className="heading-2">Explore</h2>
                <ul className="list-unstyled explore">
                  <li>
                    <a href="">
                      <span className="arrow-icon">
                        <ArrowRightOutlined />
                      </span>
                      <Link to="about-us">About us</Link>
                    </a>
                  </li>
                  <li>
                    <Link to="/consignment">
                      <span className="arrow-icon">
                        <ArrowRightOutlined />
                      </span>
                      Services
                    </Link>
                  </li>
                  <li>
                    <a href="">
                      <span className="arrow-icon">
                        <ArrowRightOutlined />
                      </span>
                      Contact us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-lg">
              <div className="footer-widget contact-2">
                <h2 className="heading-2 buy-koi">Buy a Koi?</h2>
                <div className="contact-section">
                  <ul className="" style={{ width: "500px" }}>
                    <li>
                      <span className="contact-icon">
                        <ShopOutlined />
                      </span>
                      <span className="text-contact">123 Le Van Viet</span>
                    </li>
                    <li>
                      <span className="contact-icon">
                        <PhoneOutlined />
                      </span>
                      <a href="tel:0938345312" className="text-contact">
                        0938345312
                      </a>
                    </li>
                    <li>
                      <span className="contact-icon">
                        <MailOutlined />
                      </span>
                      <a
                        href="mailto:phuocnntse182664@fpt.edu.vn"
                        className="text-contact"
                      >
                        phuocnntse182664@fpt.edu.vn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
