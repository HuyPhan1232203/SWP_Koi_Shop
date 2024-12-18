import { useEffect, useState } from "react";
import uploadFile from "../../../utils/file";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeKoi } from "../../../redux/features/koiSlice";
import { CSSTransition } from "react-transition-group";
import AOS from "aos";
import "aos/dist/aos.css";
function ConsignmentOffline() {
  const [formStand] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [submitBreed, setSubmitBreed] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };
  //FETCH
  const fetchBreed = async () => {
    try {
      const response = await api.get("breed");
      setSubmitBreed(response.data);
      console.log(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  //USE EFFECT
  useEffect(() => {
    fetchBreed();
  }, []);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
  const handleSubmitKoi = async (Koi) => {
    try {
      if (user === null) {
        nav("/login");
        return;
      }
      setLoading(true);
      //convert Object to string img
      Koi.imageUrl = await uploadFile(Koi.imageUrl.file.originFileObj);
      console.log(Koi.imageUrl);
      dispatch(storeKoi(Koi));
      setShowForm(false);
      console.log(Koi);
      nav("check-consign");
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(true);
    }
  };
  return (
    <div className="Consign_body" data-aos="flip-right">
      <CSSTransition
        in={showForm}
        timeout={500}
        classNames="slide"
        unmountOnExit
      >
        <div className="Consign_body-form row">
          <div className="col-md-6 form">
            <div className="form_head">Show Us Your Koi</div>
            <Form
              className="form-depo"
              labelCol={{ span: 8 }}
              onFinish={handleSubmitKoi}
              form={formStand}
            >
              <Form.Item
                label="Born Year"
                name="bornYear"
                rules={[
                  { required: true, message: "Please input the born year" },
                  {
                    type: "number",
                    min: 1900,
                    max: new Date().getFullYear(),
                    message: "Please enter a valid year",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Breed Name"
                name="breedId"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one breed",
                  },
                ]}
              >
                <Select mode="multiple">
                  {submitBreed.map((breed) => (
                    <Select.Option key={breed.name} value={breed.id}>
                      {breed.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter a description" },
                  {
                    min: 10,
                    message: "Description must be at least 10 characters long",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Origin"
                name="origin"
                rules={[
                  { required: true, message: "Please input the origin" },
                  {
                    min: 3,
                    message: "Origin must be at least 3 characters long",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please select a gender" }]}
              >
                <Radio.Group name="radiogroup">
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  { required: true, message: "Please input the quantity" },
                  {
                    type: "number",
                    min: 1,
                    message: "Quantity must be at least 1",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Size"
                name="size"
                rules={[
                  { required: true, message: "Please input the size" },
                  {
                    type: "number",
                    min: 1,
                    message: "Size must be a positive number",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item label="Image" name="imageUrl">
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length < 1 ? uploadButton : null}
                </Upload>
              </Form.Item>
              <Button
                className="con-btn"
                onClick={formStand.submit}
                disabled={loading}
              >
                Consign
              </Button>
            </Form>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>
          <div
            className="col-md-6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <img src="/assets/images/koi-1.avif" className="koi-pic-2"></img>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={!showForm}
        timeout={500}
        classNames="slide"
        unmountOnExit
        onExited={() => nav("check-consign")} // Navigate to the next page after transition
      >
        <div className="Consign_body-show_consign">
          <Outlet />
        </div>
      </CSSTransition>
    </div>
  );
}

export default ConsignmentOffline;
