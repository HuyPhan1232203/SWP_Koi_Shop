import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../config/axios";
import Aos from "aos";
import "aos/dist/aos.css";
function Sell() {
  const [koiList, setKoiList] = useState([]);
  const fetchKoi = async () => {
    try {
      const response = await api.get("consignment/getOnlineConsignmentKoi");
      console.log(response.data);
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
  return (
    <div>
      {[...koiList].reverse().map((koi) => {
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
              <div className="col-md-6 koi_name">{koi.name}</div>
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
