import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../config/axios";
import Aos from "aos";
import "aos/dist/aos.css";
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
    </div>
  );
}

export default Care;
