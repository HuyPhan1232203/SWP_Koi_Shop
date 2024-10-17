import "./consignment.css";
import { Outlet, useNavigate } from "react-router-dom";

function Consignment() {
  const nav = useNavigate();
  const handleConsignment = () => {
    const check = document.getElementById("depositCheckbox");
    check.addEventListener("change", function () {
      if (this.checked) {
        nav("online");
      } else {
        nav("");
      }
    });
  };
  //SUBMIT

  return (
    <div className="Introduction">
      <h1 className="Intro_header">Deposit Koi</h1>
      <div
        style={{
          display: "flex",
          width: "50%",
          justifyContent: "space-between",
          borderBottom: "1px #ccc solid",
          marginBottom: "30px",
          paddingBottom: "20px",
        }}
      >
        <p style={{ fontWeight: "600" }}>Consigned to the farm for sale</p>
        <label className="switch" onClick={handleConsignment}>
          <input type="checkbox" id="depositCheckbox" />
          <span className="slider round"></span>
        </label>
      </div>
      <Outlet />
    </div>
  );
}

export default Consignment;
