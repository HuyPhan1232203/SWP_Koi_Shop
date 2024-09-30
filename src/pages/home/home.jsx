import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
function HomePage() {
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
          <div className="authen">welcome, {username}</div>
          <div className="cart">
            <Link to="/">
              <ShoppingCartOutlined
                className="cart_icon"
                style={{ fontSize: "20px", color: "#fff" }}
              />
            </Link>
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
                  <a href="#">Home</a>
                </li>
                <li className="nav_li">Introduction</li>
                <li className="nav_li nav_li_koi">
                  Koi List
                  <ul className="nav_li_koi_elements">
                    <li>heasdasd</li>
                    <li>he</li>
                    <li>he</li>
                    <li>he</li>
                    <li>he</li>
                    <li>he</li>
                    <li>he</li>
                    <li>he</li>
                  </ul>
                </li>
                <li className="nav_li">About Us</li>
              </ul>

              {authenticate(username)}
            </div>
          </div>
        </div>
      </div>
      <div className="container"></div>
      <div className="footer"></div>
    </div>
  );
}

export default HomePage;
