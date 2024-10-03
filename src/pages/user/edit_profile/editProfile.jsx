import React from "react";
import "./editProfile.css";
import { Button, Form, Input } from "antd";

function EditProfile() {
  const username = sessionStorage.getItem("username");
  return (
    <div className="editProfile">
      <div className="editProfile_title">About</div>
      <div className="edit">
        <div className="edit_field">
          <div className="edit_field font">User Name:</div>
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
