import { useEffect, useState } from "react";
import "./editProfile.css";
import { Button, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/features/userSlice";
import AOS from "aos";
import "aos/dist/aos.css";
function EditProfile() {
  const userInfo = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [defaultVal, setDefaultVal] = useState();
  const [defaultField, setDefaultField] = useState();
  const [balance, setBalance] = useState([]);
  const [form] = Form.useForm();
  //Fetch
  const fetchBalance = async () => {
    const res = await api.get(`account?role=CUSTOMER&id=${userInfo.id}`);
    console.log(res.data);
    setBalance(res.data.balance);
  };

  //update
  const handleEditInfo = async (value) => {
    try {
      console.log(value.email);
      const response = await api.put(`account/${userInfo.id}`, value);
      dispatch(login(response.data));
      console.log(response.data);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setOpenModal(false);
    }
  };
  useEffect(() => {
    fetchBalance();
  }, []);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <div className="editProfile">
      <Modal
        open={openModal}
        title={`Change ${defaultField}`}
        onCancel={() => {
          setOpenModal(false);
        }}
        onOk={form.submit}
        className="edit_profile-modal"
      >
        <Form form={form} onFinish={handleEditInfo}>
          <Form.Item
            initialValue={defaultVal}
            label={`Current ${defaultField}`}
            name={defaultField}
          >
            <Input defaultValue={defaultVal} disabled></Input>
          </Form.Item>
          <Form.Item initialValue={userInfo.id} hidden name="id">
            <Input defaultValue={userInfo.id} hidden></Input>
          </Form.Item>
          <Form.Item initialValue={userInfo.username} hidden name="username">
            <Input defaultValue={userInfo.username} hidden></Input>
          </Form.Item>
          <Form.Item initialValue={userInfo.role} hidden name="role">
            <Input defaultValue={userInfo.role} hidden></Input>
          </Form.Item>
          <Form.Item initialValue={userInfo.phone} hidden name="phone">
            <Input defaultValue={userInfo.phone} hidden></Input>
          </Form.Item>
          <Form.Item initialValue={userInfo.email} hidden name="email">
            <Input defaultValue={userInfo.email} hidden></Input>
          </Form.Item>
          <Form.Item initialValue={userInfo.address} hidden name="address">
            <Input hidden></Input>
          </Form.Item>
          <Form.Item label={`New ${defaultField}`} name={defaultField}>
            <Input defaultValue={defaultField}></Input>
          </Form.Item>
        </Form>
      </Modal>
      <div className="editProfile_title" data-aos="fade-down">
        About
      </div>
      <div style={{ marginLeft: "700px", color: "red" }}>
        Balance: {formatCurrency(balance)} VNĐ
      </div>
      <div className="edit" data-aos="fade-right">
        <div className="edit_field">
          <div className="edit_field_title font">User Name:</div>
          <div className="edit_field-parameter">{userInfo.username}</div>
        </div>
        <button
          className="edit_btn"
          onClick={() => {
            setOpenModal(true);
            setDefaultVal(userInfo.username);
            setDefaultField("username");
          }}
        >
          Edit
        </button>
      </div>
      <div className="edit" data-aos="fade-right" data-aos-delay="100">
        <div className="edit_field">
          <div className="edit_field_title font">Email:</div>
          <div className="edit_field-parameter">{userInfo.email}</div>
        </div>
        <button
          className="edit_btn"
          onClick={() => {
            setOpenModal(true);
            setDefaultVal(userInfo.email);
            setDefaultField("email");
          }}
        >
          Edit
        </button>
      </div>
      <div className="edit" data-aos="fade-right" data-aos-delay="200">
        <div className="edit_field">
          <div className="edit_field_title font">Phone:</div>
          <div className="edit_field-parameter">{userInfo.phone}</div>
        </div>
        <button
          className="edit_btn"
          onClick={() => {
            setOpenModal(true);
            setDefaultVal(userInfo.phone);
            setDefaultField("phone");
          }}
        >
          Edit
        </button>
      </div>
      <div className="edit" data-aos="fade-right" data-aos-delay="300">
        <div className="edit_field">
          <div className="edit_field_title font">Address:</div>
          <div className="edit_field-parameter">{userInfo.address}</div>
        </div>
        <button
          className="edit_btn"
          onClick={() => {
            setOpenModal(true);
            setDefaultVal(userInfo.address);
            setDefaultField("address");
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
