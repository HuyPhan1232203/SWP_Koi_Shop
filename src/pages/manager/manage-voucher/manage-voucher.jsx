import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
} from "antd";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import moment from "moment";
function ManageVoucher() {
  const [KoiFish, setKoiFish] = useState([]);
  const [formStand] = Form.useForm();
  const [submitKoi, setSubmitKoi] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  //FETCH
  const fetchKoi = async () => {
    const response = await api.get("voucher");
    console.log(response.data);
    setKoiFish(response.data);
  };

  //USE EFFECT
  useEffect(() => {
    fetchKoi();
  }, []);
  //OPEN MODAL
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  //CLOSE MODEL
  const handleClosenModal = () => {
    setOpenModal(false);
  };
  const StartDateDisplay = (startDate) => {
    const formattedDate = new Date(startDate).toLocaleString();
    return (
      <div>
        <div>{formattedDate}</div>
      </div>
    );
  };
  const disableBefore7thDate = (current) => {
    // Calculate the date 7 days from now
    const minDate = moment().add(7, "days").startOf("day");
    // Disable all dates before the 7th day from now
    return current && current < minDate;
  };
  //CREATE OR UPDATE
  const handleSubmitKoi = async (Koi) => {
    console.log(Koi.expiredDate);
    try {
      let response = null;
      if (Koi.id) {
        //update
        response = await api.put(`voucher/${Koi.id}`, Koi);
        console.log(response);
      } else {
        //create
        response = await api.post(`voucher`, Koi);
        console.log(response);
      }
      fetchKoi();
      toast.success("Update successfully!!!");
      formStand.resetFields();
      handleClosenModal();
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data); // Better error handling
      } else {
        console.log("An unexpected error occurred", err);
      }
    } finally {
      setSubmitKoi(false);
    }
  };
  const handleDeleteKoi = async (id) => {
    try {
      console.log(id);
      const response = await api.delete(`voucher/${id}`);
      console.log(response);
      toast.success("Deleteted successfully!!!");
      fetchKoi();
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Discount Value",
      dataIndex: "discountValue",
      key: "discountValue",
    },
    {
      title: "Expired Date",
      dataIndex: "expiredDate",
      key: "expiredDate",
      render: (expiredDate) => {
        return StartDateDisplay(expiredDate);
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, koi) => {
        return (
          <div
            style={{
              display: "flex",
              width: "150px",
              justifyContent: "space-around",
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                setOpenModal(true);
                try {
                  formStand.setFieldsValue({
                    ...koi,
                    expiredDate: moment(koi.expiredDate, "YYYY-MM-DD"),
                  });
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Edit
            </Button>

            <Popconfirm
              onConfirm={() => {
                handleDeleteKoi(id);
              }}
              title="Delete"
              description="Are you sure"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const formItems = (
    <>
      <Form.Item
        labelCol={{ span: 7 }}
        label="Discount Value"
        name="discountValue"
        rules={[
          { required: true, message: "Please input the discount value" },
          {
            type: "number",
            min: 1,
            message: "Discount value must be at least 1",
          },
        ]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 7 }}
        label="Expired Date"
        name="expiredDate"
        rules={[{ required: true, message: "Please select an expired date" }]}
      >
        <DatePicker disabledDate={disableBefore7thDate} />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 7 }}
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please input a name" },
          { min: 3, message: "Name must be at least 3 characters long" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 7 }}
        label="Code"
        name="code"
        rules={[
          { required: true, message: "Please input a code" },
          { min: 3, message: "Code must be at least 3 characters long" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 7 }}
        label="Quantity"
        name="quantity"
        rules={[
          { required: true, message: "Please input a quantity" },
          { type: "number", min: 1, message: "Quantity must be at least 1" },
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>
    </>
  );
  return (
    <div>
      <div className="header text-center p-5 ">
        <h1 className="header_text" style={{ color: "#000" }}>
          {name} Management
        </h1>
      </div>
      <div className="sub_header">
        <Button className="add_btn" onClick={handleOpenModal}>
          Create {name}
        </Button>
      </div>
      <Modal
        confirmLoading={submitKoi}
        title={<span className="Modal_header">{name} Information</span>}
        open={openModal}
        onCancel={() => {
          handleClosenModal();
          formStand.resetFields();
        }}
        onOk={formStand.submit}
      >
        <Form onFinish={handleSubmitKoi} form={formStand}>
          <Form.Item hidden label="id" name="id">
            <Input></Input>
          </Form.Item>
          {formItems}
        </Form>
      </Modal>
      <Table columns={columns} dataSource={KoiFish}></Table>
    </div>
  );
}

export default ManageVoucher;
