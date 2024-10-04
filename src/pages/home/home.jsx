import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./home.css";
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
import { Modal, Popconfirm } from "antd";
function HomePage() {
  const nav = useNavigate();
  const [openModal, setOpenModal] = useState(false);
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
                style={{ fontSize: "20px", color: "#fff", padding: "3px" }}
              />
              <p>Shopping Cart</p>
            </Link>
          </div>
          <div className="authen">
            User | {username}
            <ul className="user_action">
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
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
                  <Link to="/">Home</Link>
                </li>
                <li className="nav_li">
                  <Link to="/introduction">Introduction</Link>
                </li>
                <li className="nav_li nav_li_koi">
                  Koi List
                  <ul className="nav_li_koi_elements">
                    <li>Koi Kohaku</li>
                    <li>Koi Ogon</li>
                    <li>Koi Showa</li>
                    <li>Koi Tancho</li>
                    <li>Koi Bekko</li>
                    <li>Koi Doistu</li>
                    <li>Koi Ginrin</li>
                    <li>Koi Goshiki</li>
                  </ul>
                </li>

                <Link
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
      {/* Conditional Rendering for Homepage Content */}
      {location.pathname === "/" && (
        <div className="homepage-design">
          <div className="overlay"></div>
          <div className="container">
            <div className="row slider-text">
              <div className="col-md-11 text-center-slider">
                <h1 className="mb-4">Swim into Serenity: Find Your Perfect Koi!</h1>
                <p>
                  <a href="" className="btn-koi-list">Koi List</a>
                </p>
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
                <p className="slogan">Swim into Serenity: Find Your Perfect Koi!</p>
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
                      About us
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
                      <span className="text-contact">090909090909</span>
                    </li>
                    <li>
                      <span className="contact-icon">
                        <MailOutlined />
                      </span>
                      <span className="text-contact">abc@gmail.com</span>
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
