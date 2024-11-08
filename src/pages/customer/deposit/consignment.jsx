import { useSelector } from "react-redux";
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
  const user = useSelector((store) => store.user);
  const checkuser = () => {
    if (user === null) {
      return <div style={{ color: "red" }}>Please login before consign!!!</div>;
    }
  };
  return (
    <div className="Introduction">
      <h1 className="Intro_header">DEPOSIT KOI</h1>
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
      {checkuser()}
      <Outlet />
    </div>
  );
}

export default Consignment;
