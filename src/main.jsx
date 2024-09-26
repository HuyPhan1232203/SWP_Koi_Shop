import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import KoiManagement from "./KoiManagement.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import App from "../App.jsx";
createRoot(document.getElementById("root")).render(
  <>
    <App />
    
    <ToastContainer />
    
  </>
);
