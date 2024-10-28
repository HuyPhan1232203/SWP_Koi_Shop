import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../config/axios";

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
    fetchKoi();
  }, []);
  return (
    <div>
      {koiList.map((koi) => {
        return (
          <div className="koi" key={koi.id}>
            <div className="koi-1 row ">
              <img
                className="col-md-2"
                src={koi.imgUrl}
                height={200}
                style={{ objectFit: "contain" }}
                alt=""
              />
              <div className="col-md-6" style={{ display: "flex" }}>
                End date:
                <div style={{ color: "red", marginLeft: "10px" }}>
                  {StartDateDisplay(koi.endDate)}
                </div>
              </div>
              <div className="col-md-4 koi_status">
                Status: {koi.isConsignment}
              </div>
            </div>
            <div className="price">Price: {koi.price}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Care;
