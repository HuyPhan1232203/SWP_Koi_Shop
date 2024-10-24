import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  ProfileOutlined,
  ShoppingOutlined,
  SnippetsOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../redux/features/userSlice";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={`/dashboard-staff/${key}`}>{label}</Link>,
  };
}
const items = [
  getItem(
    "Orders List",
    "orderlist",
    <ShoppingOutlined style={{ color: "#fff" }} />
  ),
  getItem(
    "Care Consign List",
    "care-consign",
    <SnippetsOutlined style={{ color: "#fff" }} />
  ),
  getItem("Profile", "profile", <ProfileOutlined style={{ color: "#fff" }} />),
];
const DashboardStaff = () => {
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
  const handleLogOut = () => {
    sessionStorage.removeItem("username");
    dispatch(logout());
    nav("/");
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
          colorText: "#000",
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
            bodyBg: "#ccc",
            siderBg: "#000",
            triggerBg: "#fff",
            triggerColor: "#000",
            lightTriggerColor: "#fff",
          },
          Table: {
            /* here is your component tokens */
            headerBg: "#000",
            headerColor: "#fff",
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
            className="menu-staff"
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
          <Button
                style={{
                  marginLeft: "48px",
                  marginTop: "540px",
                  padding: "0 25px",
                  position: "fixed",
                }}
                onClick={handleLogOut}
              >
                LogOut
              </Button>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#ccc",
            }}
          />
          <Content
            style={{
              margin: "0 16px",
              backgroundColor: "#ccc",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item></Breadcrumb.Item>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: "#ccc",
                borderRadius: borderRadiusLG,
              }}
            >
              {showName()}
              
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              backgroundColor: "#ccc",

            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default DashboardStaff;
