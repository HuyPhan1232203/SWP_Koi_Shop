import React from "react";
import "./authen_template.css";
function Authen_template({ children }) {
  return (
    <div className="authen-template">
      <div className="authen-template_form text-center">{children}</div>
    </div>
  );
}

export default Authen_template;
