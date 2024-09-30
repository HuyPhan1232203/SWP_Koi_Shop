import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./src/pages/login/login";
import RegisterPage from "./src/pages/register/register";
import HomePage from "./src/pages/home/home";
import KoiManagement from "./src/KoiManagement";
import Dashboard from "./src/conponent/dashboard";
import ManagementKoi from "./src/pages/manager/manage-koi-list";
import ViewKoiList from "./src/pages/customer/view-koi-list/view-koi-list";
import DashboardCustomer from "./src/conponent/dashboard-customer/dashboard-customer";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "koiManager",
      element: <KoiManagement />,
    },

    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "koilist",
          element: <ManagementKoi />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
