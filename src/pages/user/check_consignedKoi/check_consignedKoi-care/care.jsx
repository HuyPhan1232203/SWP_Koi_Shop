import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../config/axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { Button, DatePicker, Form, Modal, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
function Care() {
  const [koiList, setKoiList] = useState([]);
  const [form] = Form.useForm();
  const [orderID, setOrderID] = useState();
  const [oldEndDate, setOldEndDate] = useState();
  const fetchKoi = async () => {
    try {
      const response = await api.get("consignment/getOfflineConsignmentKoi");
      console.log(response.data);
      setKoiList(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const StartDateDisplay = (startDate) => {
    const formattedDate = new Date(startDate).toLocaleString();
    return (
      <div>
        <div>{formattedDate}</div>
      </div>
    );
  };
  const handleCancel = async (id) => {
    try {
      await api.put(`consignment/cancel?consginementid=${id}`);
      toast.success("Cancelled Successfully!!!");
    } catch (err) {
      toast.error(err.res.data);
    } finally {
      fetchKoi();
    }
  };
  const [openExtendModal, setOpenExtendModal] = useState(false);
  const handleShowExtend = (status, id, end) => {
    if (status === "CONSIGNED") {
      return (
        <div>
          <Button
            type="primary"
            className="extend_btn"
            onClick={() => {
              setOpenExtendModal(true);
              setOrderID(id);
              setOldEndDate(String(end));
            }}
          >
            Extend
          </Button>
        </div>
      );
    }
  };
  const handleShowCancel = (status, koi) => {
    if (status !== "CANCELLED" && status !== "DECLINED") {
      return (
        <Popconfirm
          title="Are you sure you want to cancel this?"
          onConfirm={() => {
            handleCancel(koi.id);
          }}
        >
          <Button type="primary" danger className="cancel_btn">
            Cancel
          </Button>
        </Popconfirm>
      );
    }
  };

  const nav = useNavigate();
  const handleExtend = async (value) => {
    try {
      const response = await api.put(`consignment/extend?id=${orderID}`, value);
      console.log(response.data);
      window.open(response.data);
      nav(0);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setOpenExtendModal(false);
    }
  };
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);
  useEffect(() => {
    fetchKoi();
  }, []);
  const disablePastDates = (current) => {
    if (!oldEndDate) return true; // Disable all dates if oldEndDate is not set
    const minDateB = moment(oldEndDate).add(1, "days").startOf("day");
    return current && current < minDateB;
  };

  return (
    <div>
      {koiList.map((koi) => {
        return (
          <div className="koi" key={koi.id} data-aos="fade-right">
            <div className="koi-1 row">
              <img
                className="col-md-2"
                src={koi.imgUrl}
                height={200}
                width={200}
                style={{ objectFit: "contain" }}
                alt=""
              />
              <div className="col-md-7" style={{ display: "flex" }}>
                End date:
                <div className="cancel_btn-div2">
                  {handleShowCancel(koi.isConsignment, koi)}
                  {handleShowExtend(koi.isConsignment, koi.id, koi.endDate)}
                </div>
                <div style={{ color: "red", marginLeft: "10px" }}>
                  {StartDateDisplay(koi.endDate)}
                </div>
              </div>
              <div className="col-md-3 koi_status">
                Status: {koi.isConsignment}
              </div>
            </div>
            <div className="price">Cost: {koi.price} VNĐ</div>
          </div>
        );
      })}
      <Modal
        open={openExtendModal}
        onCancel={() => {
          setOpenExtendModal(false);
        }}
        onOk={form.submit}
      >
        <Form form={form} onFinish={handleExtend} className="form_extend">
          <Form.Item
            labelCol={{ span: 7 }}
            label="New EndDate"
            name="extendDate"
            rules={[{ required: true, message: "Please Input Expired Date" }]}
          >
            <DatePicker disabledDate={disablePastDates} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Care;
