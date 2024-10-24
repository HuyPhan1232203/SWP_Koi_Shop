import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./src/pages/login/login";
import RegisterPage from "./src/pages/register/register";
import HomePage from "./src/pages/home/home";
import Dashboard from "./src/conponent/dashboard";
import ManagementKoi from "./src/pages/manager/manage-koi-list";
import ManageVoucher from "./src/pages/manager/manage-voucher/manage-voucher";
import ManageStaff from "./src/pages/manager/manage-staff/manage-staff";
import AboutUs from "./src/pages/customer/about-us/about-us";
import Profile from "./src/pages/user/profile/profile";
import EditProfile from "./src/pages/user/edit_profile/editProfile";
import Breeds from "./src/pages/manager/manage-breeds/breeds";
import ForgotPassword from "./src/pages/forgot-password/forgot";
import ResetPassword from "./src/pages/reset-password/reset";
import Cart from "./src/pages/user/shopping_cart/cart";
import { toast } from "react-toastify";
import DashboardStaff from "./src/conponent/dashboard-staff/dashboard-staff";
import ManageOrders from "./src/pages/staff/manage-orders-list/manage-order-list";
import { useSelector } from "react-redux";
import KoiBreedType from "./src/pages/user/koi_breed_type/koi_breed_type";
import ManageProfile from "./src/pages/staff/manage-profile-staff/manage-profile";
import KoiDetail from "./src/pages/user/koi_detail/koi_detail";
import ManageStaffJob from "./src/pages/manager/manage-staff-job/manage-staff-job";
import CheckOut from "./src/pages/user/check_out/check_out";
import CheckOutNormal from "./src/pages/user/check_out/check_out-normal";
import History from "./src/pages/user/purchase-history/history";
import Success from "./src/pages/user/successPage/success";
import ManageCertificate from "./src/pages/manager/manage-certificate/manage-certificate";
import Consignment from "./src/pages/customer/deposit/consignment";
import CheckOutConsignment from "./src/pages/user/check_out/check_out-deposit";
import ConsignmentOnline from "./src/pages/customer/deposit/consignment-online";
import ConsignmentOffline from "./src/pages/customer/deposit/consignment-offline";
import ShowConsignOff from "./src/pages/user/show-consignment/showConsign-off";
import ShowConsignOnl from "./src/pages/user/show-consignment/showConsign-online";
import ManageCareType from "./src/pages/manager/manage-caretype/manage-caretype";
import FailedPage from "./src/pages/failed-page/failed";
import ConsignTracking from "./src/pages/user/consign_tracking/consign_tracking";
import SuccessPageForConsign from "./src/pages/user/successPage/success-consign";
import CheckConsignOnl from "./src/pages/user/check_consignedKoi/check_consignedKoi-on";
import Care from "./src/pages/user/check_consignedKoi/check_consignedKoi-care/care";
import Sell from "./src/pages/user/check_consignedKoi/check_consignedKoi-sell/sell";
import SuccessConsignmentPage from "./src/pages/user/successPage/success-consignment";
import CheckOutALL from "./src/pages/user/check_out/checkout-all";
import ManageKoiSale from "./src/pages/manager/manage-koi-sale/manage-koi-sale";
import PDF from "./src/PDF/pdf";
import Certificate from "./src/pages/certificate/certificate";
import { PDFViewer } from "@react-pdf/renderer";
import CareConsign from "./src/pages/staff/manage-consign-care/manage-consign-care";
import ManageStaffConsign from "./src/pages/manager/manage-staff-consign/manage-staff-consign";
function App() {
  const ProtectRouteAuth = ({ children }) => {
    const user = useSelector((store) => store.user);
    console.log(user);
    if (user && user?.role === "MANAGER") {
      return children;
    }
    toast.error("You are not allowed to access this!");
    return <Navigate to={"/login"} />;
  };

  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
      children: [
        {
          path: "consignment",
          element: <Consignment />,
          children: [
            {
              path: "online",
              element: <ConsignmentOnline />,
              children: [
                {
                  path: "check-consign",
                  element: <ShowConsignOnl />,
                },
              ],
            },
            {
              path: "",
              element: <ConsignmentOffline />,
              children: [
                {
                  path: "check-consign",
                  element: <ShowConsignOff />,
                },
              ],
            },
          ],
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
          path: "koi-list",
          element: <KoiBreedType />,
        },
        {
          path: "koi-detail",
          element: <KoiDetail />,
        },
        {
          path: "check-out",
          element: <CheckOut />,
          children: [
            {
              path: "",
              element: <CheckOutNormal />,
              children: [
                {
                  path: "confirm",
                  element: <CheckOutALL />,
                },
                {
                  path: "care",
                  element: <Care />,
                },
              ],
            },
            {
              path: "check-out-consignment",
              element: <CheckOutConsignment />,
            },
          ],
        },
        {
          path: "consign-tracking",
          element: <ConsignTracking />,
        },
        {
          path: "profile",
          element: <Profile />,
          children: [
            {
              path: "edit_profile",
              element: <EditProfile />,
            },
            {
              path: "order-history",
              element: <History />,
            },
            {
              path: "consign-history",
              element: <CheckConsignOnl />,
              children: [
                {
                  path: "",
                  element: <Sell />,
                },
                {
                  path: "care",
                  element: <Care />,
                },
              ],
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
      path: "certi",
      element: <Certificate />,
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
      path: "successful",
      element: <Success />,
    },
    {
      path: "failed",
      element: <FailedPage />,
    },
    {
      path: "successful-consign",
      element: <SuccessPageForConsign />,
    },
    {
      path: "successful-consignment", // Success page cho check-out-consignment
      element: <SuccessConsignmentPage />,
    },

    {
      path: "dashboard",
      element: (
        <ProtectRouteAuth>
          <Dashboard />
        </ProtectRouteAuth>
      ),
      children: [
        {
          path: "koilist",
          element: <ManagementKoi />,
        },
        {
          path: "manage-staff-job",
          element: <ManageStaffJob />,
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
        {
          path: "certificate",
          element: <ManageCertificate />,
        },
        {
          path: "caretype",
          element: <ManageCareType />,
        },
        {
          path: "koi-sale",
          element: <ManageKoiSale />,
        },
        {
          path: "staff-consign",
          element: <ManageStaffConsign />,
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
          path: "care-consign",
          element: <CareConsign />,
        },
        {
          path: "profile",
          element: <ManageProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
