import React, { useState } from "react";
import {
  ContainerOutlined,
  IdcardOutlined,
  ProductOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={`/dashboard/${key}`}>{label}</Link>,
  };
}
const items = [
  getItem("Overview", "overview", <ProductOutlined style={{ color: "#fff" }} />),
  getItem("Koi List", "koilist", <ProductOutlined style={{ color: "#fff" }} />),
  getItem(
    "Voucher List",
    "voucher",
    <ContainerOutlined style={{ color: "#fff" }} />
  ),
  getItem("Staff List", "staff", <IdcardOutlined style={{ color: "#fff" }} />),
  getItem("Breeds", "breeds", <ProfileOutlined style={{ color: "#fff" }} />),
  getItem(
    "Staff Job",
    "manage-staff-job",
    <ProfileOutlined style={{ color: "#fff" }} />
  ),
  getItem(
    "Care Type",
    "caretype",
    <ProfileOutlined style={{ color: "#fff" }} />
  ),
  getItem(
    "Koi Sale",
    "koi-Sale",
    <ProfileOutlined style={{ color: "#fff" }} />
  ),
  getItem(
    "Staff Consign",
    "staff-consign",
    <ProfileOutlined style={{ color: "#fff" }} />
  ),
];

const Dashboard = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showName = () => {
    if (user) {
      return (
        <h4
          style={{
            fontFamily: "serif",
            color: "#fff",
            border: "1px solid #000",
            backgroundColor: "#000",
            borderRadius: "10px",
            paddingBottom: "10px",
            paddingTop: "10px",
            width: "300px",
            textAlign: "center",
          }}
        >
          Author: {user.username}
        </h4>
      );
    } else {
      toast.error("no token");
    }
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogOut = () => {
    sessionStorage.removeItem("username");
    dispatch(logout());
    nav("/");
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
          // colorText: "#fff",
          colorLink: "#fff",
        },
        components: {
          Menu: {
            darkItemBg: "#000",
            darkItemSelectedBg: "#aaa",
            darkItemSelectedColor: "#fff",
            darkItemColor: "#fff",
          },
          Button: {
            /* here is your component tokens */
            defaultHoverBorderColor: "#ccc",
            defaultHoverColor: "#aaa",
            defaultBorderColor: "#000",
            defaultColor: "#000",
            defaultBg: "#fff",
          },
          Layout: {
            /* here is your component tokens */
            siderBg: "#000",
            triggerBg: "#aaa",
            triggerColor: "#000",
            lightTriggerColor: "#fff",
          },
          Table: {
            /* here is your component tokens */
            headerColor: "#000",
            headerSplitColor: "#aaa",
            rowHoverBg: "#E4E4E3",
            colorBgContainer: "#fff",
            bodySortBg: "#E9F6FF",
            colorText: "#000",
          },
          Form: {
            labelColor: "#000",
          },
          Modal: {
            contentBg: "#fff",
            headerBg: "#fff",
            titleColor: "#000",
          },
          Input: {
            colorBgContainer: "#fff",
            activeBorderColor: "#fff",
            hoverBorderColor: "#000",
          },
          InputNumber: {
            colorBgContainer: "#fff",
            activeBorderColor: "#fff",
            hoverBorderColor: "#000",
          },
          Radio: {
            colorText: "#000",
          },
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#fff",
            }}
          />
          <Content
            style={{
              margin: "0 16px",
              backgroundColor: "#fff",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: "#fff",
                borderRadius: borderRadiusLG,
              }}
            >
              {showName()}
              <Button
                style={{
                  marginLeft: "1050px",
                }}
                onClick={handleLogOut}
              >
                LogOut
              </Button>
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          ></Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default Dashboard;
