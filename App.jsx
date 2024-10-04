import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./src/pages/login/login";
import RegisterPage from "./src/pages/register/register";
import HomePage from "./src/pages/home/home";
import KoiManagement from "./src/KoiManagement";
import Dashboard from "./src/conponent/dashboard";
import ManagementKoi from "./src/pages/manager/manage-koi-list";
import ManageVoucher from "./src/pages/manager/manage-voucher/manage-voucher";
import ManageStaff from "./src/pages/manager/manage-staff/manage-staff";
import Introduction from "./src/pages/customer/introduction/introduction";
import AboutUs from "./src/pages/customer/about-us/about-us";
import Profile from "./src/pages/user/profile/profile";
import EditProfile from "./src/pages/user/edit_profile/editProfile";
import Breeds from "./src/pages/manager/manage-breeds/breeds";
import ForgotPassword from "./src/pages/forgot-password/forgot";
import ResetPassword from "./src/pages/reset-password/reset";
import Test from "./src/pages/test/test";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
      children: [
        {
          path: "introduction",
          element: <Introduction />,
        },
        {
          path: "about-us",
          element: <AboutUs />,
        },
        {
          path: "profile",
          element: <Profile />,
          children: [
            {
              path: "edit_profile",
              element: <EditProfile />,
            },
          ],
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "test",
      element: <Test />,
    },
    {
      path: "forgot_password",
      element: <ForgotPassword />,
    },
    {
      path: "reset_password",
      element: <ResetPassword />,
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
        {
          path: "voucher",
          element: <ManageVoucher />,
        },
        {
          path: "staff",
          element: <ManageStaff />,
        },
        {
          path: "breeds",
          element: <Breeds />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
