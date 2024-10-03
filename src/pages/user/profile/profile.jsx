import React from "react";
import "./profile.css";
import { Layout } from "antd";
import { Link, Outlet } from "react-router-dom";

function Profile() {
  const username = sessionStorage.getItem("username");
  return (
    <div className="profile">
      <div className="profile_header"></div>
      <div className="profile_body ">
        <Layout>
          <div className="row">
            <div className="left col-md-3">
              <div className="profile_avatar"></div>
              <div className="profile_name text-center">{username}</div>
              <Link
                to="edit_profile"
                style={{ width: "100%", textDecoration: "none" }}
              >
                <div className="profile_children">Edit Profile</div>
              </Link>
              <div className="profile_children">Purchase History</div>
              <div className="profile_children">Log Out</div>
            </div>
            <div className="right col-md-9">
              <Outlet />
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
}

export default Profile;
