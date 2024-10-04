import React, { useEffect } from "react";
import "./editProfile.css";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";

function EditProfile() {
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const id = sessionStorage.getItem("id");
  const fetchUserInfo = async (id) => {
    if (!id) {
      console.warn("No ID provided for fetching user info");
      return;
    }
    try {
      const response = await api.get(`account/${id}`);
      console.log(response.data);
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    if (id) {
      fetchUserInfo(id);
    }
  }, [id]);
  return (
    <div className="editProfile">
      <div className="editProfile_title">About{id}</div>
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
