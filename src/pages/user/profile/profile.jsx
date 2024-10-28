import React, { useState } from "react";
import "./profile.css";
import { Layout, Modal } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/userSlice";
import { clearAll } from "../../../redux/features/cartSlice";
import { clearAllSelectedItem } from "../../../redux/features/selectedItemsSlice";

function Profile() {
  const username = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const nav = useNavigate();
  const handleLogOut = () => {
    sessionStorage.removeItem("username");
    dispatch(logout());
    dispatch(clearAll());
    dispatch(clearAllSelectedItem());
    setOpenModal(false);
    nav("/");
  };
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
              <Link to="" style={{ width: "100%", textDecoration: "none" }}>
                <div className="profile_children">Edit Profile</div>
              </Link>
              <Link
                to="order-history"
                style={{ width: "100%", textDecoration: "none" }}
              >
                <div className="profile_children">Purchase History</div>
              </Link>
              <div style={{ width: "100%", textDecoration: "none" }}>
                <div
                  className="profile_children"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Logout
                </div>
              </div>
            </div>
            <Modal
              title="LogOut"
              open={openModal}
              onCancel={() => {
                setOpenModal(false);
              }}
              onOk={handleLogOut}
            >
              Are you sure want to log out?
            </Modal>
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
