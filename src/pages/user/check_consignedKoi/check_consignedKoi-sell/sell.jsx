import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../config/axios";

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
  return (
    <div>
      {koiList.map((koi) => {
        return (
          <div className="koi" key={koi.id}>
            <div className="koi-1 row">
              <img
                className="col-md-2"
                src={koi.imgUrl}
                width={100}
                height={100}
                alt=""
              />
              <div className="col-md-6">name: {koi.name}</div>
              <div className="col-md-4">Status: {koi.status}</div>
            </div>
            <div className="price">Price: {koi.price}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Sell;
