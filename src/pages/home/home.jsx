import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import {
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Popconfirm } from "antd";
function HomePage() {
  const nav = useNavigate();
  const handleLogOut = () => {
    sessionStorage.removeItem("username");
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
          <div className="authen">welcome, {username}</div>
          <div>
            <Link className="cart" to="/">
              <ShoppingCartOutlined
                className="cart_icon"
                style={{ fontSize: "20px", color: "#fff", padding: "3px" }}
              />
              <p>Shopping Cart</p>
            </Link>
          </div>
          <Link className="logout_btn">
            <div className="logout">
              <Popconfirm
                onConfirm={handleLogOut}
                title="LogOut"
                description="Are you sure?"
              >
                LogOut
              </Popconfirm>
            </div>
          </Link>
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
