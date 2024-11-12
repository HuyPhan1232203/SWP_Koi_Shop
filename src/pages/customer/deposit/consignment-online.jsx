import {
  Button,
  Collapse,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
} from "antd";
// import "./ManagementKoi.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import uploadFile from "../../../utils/file";
import { PlusOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeKoi } from "../../../redux/features/koiSlice";
import "./consignment.css";
import { CSSTransition } from "react-transition-group";
import TextArea from "antd/es/input/TextArea";
import AOS from "aos";
import "aos/dist/aos.css";
const ConsignmentOnline = () => {
  const [formStand] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitBreed, setSubmitBreed] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [fileListArray, setFileListArray] = useState([]);
  //FETCH
  const fetchBreed = async () => {
    try {
      const response = await api.get("breed");
      setSubmitBreed(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  //USE EFFECT
  useEffect(() => {
    fetchBreed();
  }, []);
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
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleChangeList = ({ fileList: newFileList }) =>
    setFileListArray(newFileList);

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
  const text = `
  Support customers to consign Koi fish for online business
                through the farm's system. Customers choose the online
                consignment method and provide basic information about Koi fish.
                Finalize consignment price and agreement: After receiving
                information, the store and customer agree and finalize the
                consignment value for the Koi fish. Pay consignment fee online:
                Customers pay a consignment fee of 20,000 VND to the store.
                Upload fish to the system for sale: If the fish is accepted for
                sale on the system, the fish will be posted to the store's shop
                platform. Consign Fee Regulations Online consignment fee: 20,000
                VND for each consignment. The online consignment process helps
                customers trade Koi fish effectively and conveniently through
                the store's online sales platform.
`;
  const items = [
    {
      key: "1",
      label: "Make sure you have read this!!!",
      children: <p>{text}</p>,
    },
  ];
  const nav = useNavigate();
  //CREATE OR UPDATE
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
  const handleSubmitKoi = async (Koi) => {
    try {
      if (user === null) {
        nav("/login");
        return true;
      }
      setLoading(true);
      //convert Object to string img
      Koi.imageUrl = await uploadFile(Koi.imageUrl.file.originFileObj);
      Koi.imagesList = await Promise.all(
        Koi.imagesList.fileList.map(async (img) => {
          const url = await uploadFile(img.originFileObj);
          return {
            image: url,
          };
        })
      );
      console.log(Koi);
      dispatch(storeKoi(Koi));
      setShowForm(false); // đóng sau khi nhấn nút Consign
      console.log(Koi);
      nav("check-consign");
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className="Consign_body" data-aos="flip-left">
      <CSSTransition
        in={showForm}
        timeout={500}
        classNames="slide"
        unmountOnExit
      >
        <div className="Consign_body-form row">
          <div className="col-md-6">
            <img src="/assets/images/koi-2.avif" className="koi-pic"></img>
            <div style={{ color: "#000" }} className="contact_online">
              <p style={{ fontSize: "16px" }}></p>
              <Collapse
                items={items}
                defaultActiveKey={["1"]}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="col-md-6 form">
            <div className="form_head">Show Us Your Koi</div>
            <Form
              className="form-depo"
              labelCol={{ span: 6 }}
              onFinish={handleSubmitKoi}
              form={formStand}
            >
              <Form.Item hidden label="ID" name="id">
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Name"
                style={{ color: "white" }}
                rules={[{ required: true, message: "Please Input" }]}
                name="name"
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Price"
                rules={[{ required: true, message: "Please Input" }]}
                name="price"
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Vendor"
                rules={[{ required: true, message: "Please Input" }]}
                name="vendor"
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Born Year"
                rules={[{ required: true, message: "Please Input" }]}
                name="bornYear"
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Quantity"
                rules={[{ required: true, message: "Please Input" }]}
                name="quantity"
              >
                <InputNumber></InputNumber>
              </Form.Item>
              <Form.Item label="Breed Name" name="breedId">
                <Select mode="multiple">
                  {submitBreed.map((breed) => (
                    <Select.Option
                      key={breed.name}
                      breed={breed}
                      value={breed.id}
                    >
                      {breed.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Description"
                rules={[{ required: true, message: "Please Input" }]}
                name="description"
              >
                <TextArea></TextArea>
              </Form.Item>

              <Form.Item
                label="Origin"
                rules={[{ required: true, message: "Please Input" }]}
                name="origin"
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Gender"
                rules={[{ required: true, message: "Please Input" }]}
                name="gender"
              >
                <Radio.Group name="radiogroup">
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Size"
                rules={[
                  { required: true, message: "Please Input" },
                  {
                    type: "number",
                    transform: (value) => Number(value),
                    message: "Invalid Input",
                  },
                  {
                    validator: (_, value) =>
                      value >= 3
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Size must be at least 3cm")
                          ),
                  },
                ]}
                name="size"
              >
                <InputNumber></InputNumber>
              </Form.Item>
              <Form.Item label="imageUrl" name="imageUrl">
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </Form.Item>

              <Form.Item label="imagesList" name="imagesList">
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileListArray}
                  onPreview={handlePreview}
                  onChange={handleChangeList}
                >
                  {fileList.length >= 8 ? null : uploadButton}
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
};
export default ConsignmentOnline;
