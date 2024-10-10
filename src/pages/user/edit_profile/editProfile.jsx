import React, { useEffect, useState } from "react";
import "./editProfile.css";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { useSelector } from "react-redux";

function EditProfile() {
  const userInfo = useSelector((store) => store.user);
  //update
  const handleEditInfo = async (id, value) => {
    try {
      const response = await api.put(`account/${userInfo.id}`, value);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <div className="editProfile">
      <div className="editProfile_title">About:</div>
      <div className="edit">
        <div className="edit_field">
          <div className="edit_field_title font">User Name:</div>
          <div className="edit_field-parameter font">{userInfo.username}</div>
        </div>
        <Button type="primary" className="edit_btn">
          Edit
        </Button>
      </div>
      <div className="edit">
        <div className="edit_field">
          <div className="edit_field_title font">Email:</div>
          <div className="edit_field-parameter font">{userInfo.email}</div>
        </div>
        <Button type="primary" className="edit_btn">
          Edit
        </Button>
      </div>
      <div className="edit">
        <div className="edit_field">
          <div className="edit_field_title font">Phone:</div>
          <div className="edit_field-parameter font">{userInfo.phone}</div>
        </div>
        <Button type="primary" className="edit_btn">
          Edit
        </Button>
      </div>
      <Button type="primary" className="edit_btn">
        Save
      </Button>
    </div>
  );
}

export default EditProfile;
