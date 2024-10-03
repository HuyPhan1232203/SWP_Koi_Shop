import React from "react";
import "./editProfile.css";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";

function EditProfile() {
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const id = sessionStorage.getItem("id");
  const handleEditProfile = async (value, id) => {
    if (id === "CUSTOMER") {
      try {
        const response = await api.put("account", value);
        console.log(response);
      } catch (err) {
        toast.error(err);
      }
    }
  };
  return (
    <div className="editProfile">
      <div className="editProfile_title">About</div>
      <div className="edit">
        <div className="edit_field">
          <div className="edit_field_title font">User Name:</div>
          <div className="edit_field-parameter font">{username}</div>
        </div>
        <Button type="primary" className="edit_btn">
          Edit
        </Button>
      </div>
    </div>
  );
}

export default EditProfile;
