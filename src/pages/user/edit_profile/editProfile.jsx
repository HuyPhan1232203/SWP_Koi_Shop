import React, { useEffect, useState } from "react";
import "./editProfile.css";
import { Button, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { useSelector } from "react-redux";

function EditProfile() {
  const userInfo = useSelector((store) => store.user);
  const [openModal, setOpenModal] = useState(false);
  const [defaultVal, setDefaultVal] = useState();
  const [form] = Form.useForm();
  //update
  const handleEditInfo = async (value) => {
    try {
      const response = await api.put(`account/${userInfo.id}`, value);
      console.log(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <div className="editProfile">
      <Modal
        open={openModal}
        title="Change User Name"
        onCancel={() => {
          setOpenModal(false);
        }}
        onOk={form.submit}
      >
        <Form form={form} onFinish={handleEditInfo}>
          <Form.Item label="Current UserName">
            <Input defaultValue={defaultVal} disabled></Input>
          </Form.Item>
          <Form.Item hidden name="id">
            <Input defaultValue={userInfo.id}></Input>
          </Form.Item>
          <Form.Item hidden name="role">
            <Input defaultValue={userInfo.role}></Input>
          </Form.Item>
          <Form.Item hidden name="phone">
            <Input defaultValue={userInfo.phone}></Input>
          </Form.Item>
          <Form.Item hidden name="email">
            <Input defaultValue={userInfo.email}></Input>
          </Form.Item>
          <Form.Item label="New UserName" name="username">
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal>
      <div className="editProfile_title">About:</div>
      <div className="edit">
        <div className="edit_field">
          <div className="edit_field_title font">User Name:</div>
          <div className="edit_field-parameter font">{userInfo.username}</div>
        </div>
        <Button
          type="primary"
          className="edit_btn"
          onClick={() => {
            setOpenModal(true);
            setDefaultVal(userInfo.username);
          }}
        >
          Edit
        </Button>
      </div>
      <div className="edit">
        <div className="edit_field">
          <div className="edit_field_title font">Email:</div>
          <div className="edit_field-parameter font">{userInfo.email}</div>
        </div>
        <Button
          type="primary"
          className="edit_btn"
          onClick={() => {
            setOpenModal(true);
            setDefaultVal(userInfo.email);
          }}
        >
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
    </div>
  );
}

export default EditProfile;
