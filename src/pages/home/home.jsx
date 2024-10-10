import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./home.css";
import "animate.css";
import {
  ArrowRightOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Button, Modal, Popconfirm } from "antd";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { fetchProduct } from "../user/koi_breed_type/koi_breed_type";
import { useSelector } from "react-redux";
function HomePage() {
  const nav = useNavigate();
  const userData = useSelector((store) => store.user);
  const [openModal, setOpenModal] = useState(false);
  const [breed, setBreed] = useState([]);
  const koiSectionRef = useRef(null); // Create a ref for koi section
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleLogOut = () => {
    sessionStorage.removeItem("username");
    handleCloseModal();
    nav("/");
  };
  const username = sessionStorage.getItem("username");
  const fetchBreed = async () => {
    try {
      const response = await api.get("breed");
      setBreed(response.data);
      console.log(breed);
    } catch (err) {
      toast.error("fetch breed");
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
          sessionStorage.setItem("breedId", breed.id);
          fetchProduct();
        }}
      >
        <li key={breed.id}>{breed.name}</li>
      </Link>
    );
  };
  //USE EFFECT
  useEffect(() => {
    fetchBreed();
  }, []);
  const scrollToKoiSection = () => {
    if (koiSectionRef.current) {
      koiSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const authenticate = (username) => {
    if (username == null) {
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
          <div>
            <Link className="cart" to="/">
              <ShoppingCartOutlined
                className="cart_icon"
                style={{ fontSize: "20px", color: "#000", padding: "3px" }}
              />
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "#000" }}
              >
                Shopping Cart
              </Link>
            </Link>
          </div>
          <div className="authen">
            User | {userData.username}
            <ul className="user_action">
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to="profile"
              >
                <li>My Profile</li>
              </Link>

              <li>Purchase Order</li>
              <li onClick={handleOpenModal}>LogOut</li>
            </ul>
          </div>
        </div>
      );
    }
  };
  const showKoiBreed = () => {
    return breed?.map((breedItem) => {
      return (
        <div key={breedItem.id} className="koi-types">
          <div className="koi-item">
            <img src={breedItem.imageUrl} alt="" />
            <h3>{breedItem.name}</h3>
            <Button>Explore</Button>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="homepage">
      <div className="header">
        <div className="headerbar">
          <div className="logo-container">
            <a href="#">
              <img
                src="/assets/images/koi-logo.png"
                alt="Logo"
                className="logo"
              />
            </a>
            <h1 className="header_title">Koi Shop</h1>
            <div className="header_nav">
              <ul className="subnav">
                <li className="nav_li">
                  <Link className="nav_elements" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav_li">
                  <Link className="nav_elements" to="/introduction">
                    Introduction
                  </Link>
                </li>
                <li className="nav_li nav_li_koi">
                  <a className="nav_elements" href="#koiList">
                    Koi List
                  </a>
                  <ul className="nav_li_koi_elements">
                    {/* <Link
                      className="koi_list_link"
                      onClick={() => console.log(breed.id)}
                    > */}
                    {breed.map((breed) => breeds(breed))}
                    {/* </Link> */}
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

              {authenticate(username)}
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
        <div className="homepage-section container">
          <div className="homepage-design">
            <div className="overlay"></div>
            <div>
              <div className="row slider-text">
                <div className="col-md-11 text-center-slider">
                  <h1 className="mb-4">
                    Swim into Serenity: Find Your Perfect Koi!
                  </h1>
                  <p>
                    <Button
                      onClick={scrollToKoiSection}
                      className="btn-koi-list"
                    >
                      <a style={{ textDecoration: "none" }} href="#koiList">
                        Koi List
                      </a>
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="koi-section" ref={koiSectionRef}>
            <div className="container">
              <div className="row koi-content-center" id="koiList">
                <div className="col-md-10 koi-center-heading text-center">
                  <span className="sub-heading">Our Kois</span>
                  <h2 className="mb-5">Explore our Kois</h2>
                </div>
                {/* Row Koi 1 */}
                <div className="koi_fetch_breed">{showKoiBreed()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <div className="container-xl">
          <div className="row mb-5 justify-content-between">
            <div className="col-md-4 col-lg mb-4">
              <div className="footer-widget">
                <div className="heading-footer">
                  <img
                    className="logo-footer"
                    src="/assets/images/koi-logo.png"
                    alt=""
                  />
                </div>
                <p className="slogan">
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
                <ul className="list-unstyled">
                  <li>
                    <a href="">
                      <span className="arrow-icon">
                        <ArrowRightOutlined />
                      </span>
                      <Link to="about-us">About us</Link>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <span className="arrow-icon">
                        <ArrowRightOutlined />
                      </span>
                      Services
                    </a>
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
                  <ul className="">
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
