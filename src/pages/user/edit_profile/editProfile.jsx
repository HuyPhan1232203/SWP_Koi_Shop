import { useState } from "react";
import "./editProfile.css";
import { Button, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { useSelector } from "react-redux";

function EditProfile() {
  const userInfo = useSelector((store) => store.user);
  const [openModal, setOpenModal] = useState(false);
  const [defaultVal, setDefaultVal] = useState();
  const [defaultField, setDefaultField] = useState();
  const [form] = Form.useForm();
  //update
  const handleEditInfo = async (value) => {
    try {
      console.log(value.email);
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
        title={`Change ${defaultField}`}
        onCancel={() => {
          setOpenModal(false);
        }}
        onOk={form.submit}
      >
        <Form form={form} onFinish={handleEditInfo}>
          <Form.Item
            initialValue={defaultVal}
            label={`Current ${defaultField}`}
            name="username"
          >
            <Input defaultValue={defaultVal}></Input>
          </Form.Item>
          <Form.Item initialValue={userInfo.id} name="id">
            <Input defaultValue={userInfo.id} hidden></Input>
          </Form.Item>
          <Form.Item initialValue={userInfo.role} name="role">
            <Input defaultValue={userInfo.role} hidden></Input>
          </Form.Item>
          <Form.Item initialValue={userInfo.phone} name="phone">
            <Input defaultValue={userInfo.phone} hidden></Input>
          </Form.Item>
          <Form.Item initialValue={userInfo.email} name="email">
            <Input defaultValue={userInfo.email} hidden></Input>
          </Form.Item>
          <Form.Item initialValue={userInfo.address} name="address">
            <Input hidden></Input>
          </Form.Item>
          <Form.Item label={`New ${defaultField}`} name="username">
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
            setDefaultField("Username");
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
            setDefaultField("Email");
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
        <Button
          type="primary"
          className="edit_btn"
          onClick={() => {
            setOpenModal(true);
            setDefaultVal(userInfo.phone);
            setDefaultField("Phone");
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}

export default EditProfile;
