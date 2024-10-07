import React, { useRef, useState } from "react";
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
function HomePage() {
  const nav = useNavigate();

  const [openModal, setOpenModal] = useState(false);

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
                style={{ fontSize: "20px", color: "#fff", padding: "3px" }}
              />
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "white" }}
              >
                Shopping Cart
              </Link>
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
                  <a className="nav_elements" href="/#">
                    Home
                  </a>
                </li>
                <li className="nav_li">
                  <Link className="nav_elements" to="/introduction">
                    Introduction
                  </Link>
                </li>
                <li className="nav_li nav_li_koi">
                  <a className="nav_elements" href="/#koiList">
                    Koi List
                  </a>
                  <ul className="nav_li_koi_elements">
                    <Link to="koi-list" className="koi_list_link">
                      <li>Koi Kohaku</li>
                    </Link>
                    <Link to="koi-list" className="koi_list_link">
                      <li>Koi Ogon</li>
                    </Link>
                    <Link to="koi-list" className="koi_list_link">
                      <li>Koi Showa</li>
                    </Link>
                    <Link to="koi-list" className="koi_list_link">
                      <li>Koi Tancho</li>
                    </Link>
                    <Link to="koi-list" className="koi_list_link">
                      <li>Koi Bekko</li>
                    </Link>
                    <Link to="koi-list" className="koi_list_link">
                      <li>Koi Doistu</li>
                    </Link>
                    <Link to="koi-list" className="koi_list_link">
                      <li>Koi Ginrin</li>
                    </Link>
                    <Link to="koi-list" className="koi_list_link">
                      <li>Koi Goshiki</li>
                    </Link>
                    <Link to="koi-list" className="koi_list_link">
                      <li>Koi Asagi</li>
                    </Link>
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
        <div className="homepage-section">
          <div className="homepage-design">
            <div className="overlay"></div>
            <div className="container">
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
                <div className="row koi-content">
                  <div className="col-md-4 koi-types">
                    <div className="koi-item">
                      <img src="/assets/images/kohaku.png" alt="" />
                      <h3>Kohaku</h3>
                      {/* <a className="explore-btn" href="">Explore</a> */}
                      <Button>Explore</Button>
                    </div>
                  </div>

                  <div className="col-md-4 koi-types">
                    <div className="koi-item">
                      <img src="/assets/images/ogon.png" alt="" />
                      <h3>Ogon</h3>
                      {/* <a className="explore-btn" href="">Explore</a> */}
                      <Button>Explore</Button>
                    </div>
                  </div>

                  <div className="col-md-4 koi-types">
                    <div className="koi-item">
                      <img src="/assets/images/showa.png" alt="" />
                      <h3>Showa</h3>
                      {/* <a className="explore-btn" href="">Explore</a> */}
                      <Button>Explore</Button>
                    </div>
                  </div>
                </div>

                {/* Row Koi 2 */}
                <div className="row koi-content">
                  <div className="col-md-4 koi-types">
                    <div className="koi-item">
                      <img src="/assets/images/tancho.png" alt="" />
                      <h3>Tancho</h3>
                      {/* <a className="explore-btn" href="">Explore</a> */}
                      <Button>Explore</Button>
                    </div>
                  </div>

                  <div className="col-md-4 koi-types">
                    <div className="koi-item">
                      <img src="/assets/images/bekko.png" alt="" />
                      <h3>Bekko</h3>
                      {/* <a className="explore-btn" href="">Explore</a> */}
                      <Button>Explore</Button>
                    </div>
                  </div>

                  <div className="col-md-4 koi-types">
                    <div className="koi-item">
                      <img src="/assets/images/doitsu.png" alt="" />
                      <h3>Doitsu</h3>
                      {/* <a className="explore-btn" href="">Explore</a> */}
                      <Button>Explore</Button>
                    </div>
                  </div>
                </div>
                {/* Row Koi 3 */}
                <div className="row koi-content">
                  <div className="col-md-4 koi-types">
                    <div className="koi-item">
                      <img src="/assets/images/ginrin.png" alt="" />
                      <h3>Ginrin</h3>
                      {/* <a className="explore-btn" href="">Explore</a> */}
                      <Button>Explore</Button>
                    </div>
                  </div>

                  <div className="col-md-4 koi-types">
                    <div className="koi-item">
                      <img src="/assets/images/goshiki.png" alt="" />
                      <h3>Goshiki</h3>
                      {/* <a className="explore-btn" href="">Explore</a> */}
                      <Button>Explore</Button>
                    </div>
                  </div>

                  <div className="col-md-4 koi-types">
                    <div className="koi-item">
                      <img src="/assets/images/asagi.png" alt="" />
                      <h3>Asagi</h3>
                      {/* <a className="explore-btn" href="">Explore</a> */}
                      <Button>Explore</Button>
                    </div>
                  </div>
                </div>
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
