import React, { useEffect, useState } from "react";
import "./editProfile.css";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";

function EditProfile() {
  let response = null;
  const [usernames, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const id = sessionStorage.getItem("id");
  //fetch
  const fetchUserInfo = async (id) => {
    if (!id) {
      console.warn("No ID provided for fetching user info");
      return;
    }
    try {
      response = await api.get(`account/${id}`);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      // console.log(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  //update
  const handleEditInfo = async (id, value) => {
    try {
      response = await api.put(`account/${id}`, value);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    if (id) {
      fetchUserInfo(id);
    }
  }, [id]);
  return (
    <div className="editProfile">
      <div className="editProfile_title">About:</div>
      <div className="edit">
        <div className="edit_field">
          <div className="edit_field_title font">User Name:</div>
          <div className="edit_field-parameter font">{usernames}</div>
        </div>
        <Button type="primary" className="edit_btn">
          Edit
        </Button>
      </div>
      <div className="edit">
        <div className="edit_field">
          <div className="edit_field_title font">Email:</div>
          <div className="edit_field-parameter font">{email}</div>
        </div>
        <Button type="primary" className="edit_btn">
          Edit
        </Button>
      </div>
      <div className="edit">
        <div className="edit_field">
          <div className="edit_field_title font">Phone:</div>
          <div className="edit_field-parameter font">{phone}</div>
        </div>
        <Button type="primary" className="edit_btn">
          Edit
        </Button>
      </div>
    </div>
  );
}

export default EditProfile;
