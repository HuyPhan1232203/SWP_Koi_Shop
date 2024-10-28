import React from "react";
import "./profile.css";
import { Layout } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const username = useSelector((store) => store.user);
  return (
    <div className="profile">
      <div className="profile_header"></div>
      <div className="profile_body ">
        <Layout>
          <div className="row bodyprofile">
            <div className="left col-md-3">
              <img
                className="profile_avatar"
                src="/assets/images/user.png"
              ></img>
              <div className="profile_name text-center">
                {username.username}
              </div>
              <Link
                to="edit_profile"
                style={{ width: "100%", textDecoration: "none" }}
              >
                <div className="profile_children">Edit Profile</div>
              </Link>
              <Link
                to="order-history"
                style={{ width: "100%", textDecoration: "none" }}
              >
                <div className="profile_children">Purchase History</div>
              </Link>
              <div style={{ width: "100%", textDecoration: "none" }}>
                <div className="profile_children">Logout</div>
              </div>
            </div>
            <div
              className="right col-md-9"
              style={{ height: "530px", overflowY: "auto" }}
            >
              <Outlet />
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
}

export default Profile;
