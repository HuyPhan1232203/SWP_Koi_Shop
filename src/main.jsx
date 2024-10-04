import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import App from "../App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </>
);
