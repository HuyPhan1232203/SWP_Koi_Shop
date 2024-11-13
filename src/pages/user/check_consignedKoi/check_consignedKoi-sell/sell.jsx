import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../config/axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { Button, Popconfirm } from "antd";
function Sell() {
  const [koiList, setKoiList] = useState([]);
  const fetchKoi = async () => {
    try {
      const response = await api.get("consignment/getOnlineConsignmentKoi");
      setKoiList(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    fetchKoi();
  }, []);
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);
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
  const handleShowCancel = (status, koi) => {
    if (status !== "SOLD" && status !== "CANCELLED") {
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
                style={{ objectFit: "contain" }}
                alt=""
              />
              <div className="col-md-6 koi_name">
                {koi.name}{" "}
                <div className="cancel_btn-div">
                  {handleShowCancel(koi.status, koi)}
                </div>
              </div>
              <div className="col-md-4 koi_status">Status: {koi.status}</div>
            </div>
            <div className="price">Price: {koi.price} VNĐ</div>
          </div>
        );
      })}
    </div>
  );
}

export default Sell;
