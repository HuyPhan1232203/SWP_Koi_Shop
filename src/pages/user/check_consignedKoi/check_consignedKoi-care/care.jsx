import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../config/axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { Button, Modal, Popconfirm } from "antd";
function Care() {
  const [koiList, setKoiList] = useState([]);
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
  const handleShowExtend = (status, koi) => {
    if (status === "CONSIGNED") {
      return (
        <div>
          <Button
            type="primary"
            className="extend_btn"
            onClick={() => {
              setOpenExtendModal(true);
            }}
          >
            Extend
          </Button>
        </div>
      );
    }
  };
  const handleShowCancel = (status, koi) => {
    if (status !== "CANCELLED") {
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
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);
  useEffect(() => {
    fetchKoi();
  }, []);
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
                  {handleShowExtend(koi.isConsignment, koi)}
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
      >
        {console.log("object")}
      </Modal>
    </div>
  );
}

export default Care;
