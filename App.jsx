import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import Cart from "./src/pages/user/shopping_cart/cart";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DashboardStaff from "./src/conponent/dashboard-staff/dashboard-staff";
import ManageOrders from "./src/pages/staff/manage-orders-list/manage-order-list";
import ManageBlog from "./src/pages/staff/manage-blog-list/manage-blog-list";
import { ConfigProvider } from "antd";

function App() {
  
  // const ProtectRouteAuth = ({ children }) => {
  //   const user = useSelector((store) => store.user);
  //   console.log(user);
  //   if (user && user?.role === "MANAGER") {
  //     return children;
  //   }
  //   toast.error("You are not allowed to access this!");
  //   return <Navigate to={"/login"} />;
  // };

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
          path: "cart",
          element: <Cart />,
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
      element: ( <Dashboard />
        // <ProtectRouteAuth>
        //   <Dashboard />
        // </ProtectRouteAuth>
      ),
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

    {
      path: "dashboard-staff",
      element: <DashboardStaff />,
      children: [
        {
          path: "orderlist",
          element: <ManageOrders />,
        },
        {
          path: "bloglist",
          element: <ManageBlog />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;

}

export default App;
