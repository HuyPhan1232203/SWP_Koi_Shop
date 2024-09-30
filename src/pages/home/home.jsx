import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { UserOutlined } from "@ant-design/icons";
function HomePage() {
  return (
    <div className="homepage">
      <div className="header">
        <div className="headerbar">
          <h1 className="header_title">Koi Farm Shop</h1>
          <div className="navigate">
            <ul className="subnav">
              <li className="nav_li">Home</li>
              <li className="nav_li">Introduction</li>
              <li className="nav_li">Koi List</li>
              <li className="nav_li">About Us</li>
            </ul>
            <div className="authenticate">
              <Link className="authen" to="/login">
                <UserOutlined />
                login /
              </Link>
              <Link className="authen" to="/register">
                register
              </Link>
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
