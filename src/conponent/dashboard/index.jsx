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
  getItem("Certificate", "certificate", <ProfileOutlined style={{ color: "#fff" }} />),
  getItem("Care Type", "caretype", <ProfileOutlined style={{ color: "#fff" }} />),

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
            color: "#3652AD",
            border: "1px solid #3652AD",
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
            darkItemBg: "#FE7A36",
            darkItemSelectedBg: "#3652AD",
            darkItemSelectedColor: "#fff",
            darkItemColor: "#fff",
          },
          Button: {
            /* here is your component tokens */
            defaultHoverBorderColor: "#E35C40",
            defaultHoverColor: "#E35C40",
            defaultBorderColor: "#3652AD",
            defaultColor: "#3652AD",
            defaultBg: "#E9F6FF",
          },
          Layout: {
            /* here is your component tokens */
            siderBg: "#FE7A36",
            triggerBg: "#3652AD",
            triggerColor: "#FE7A36",
            lightTriggerColor: "#fff",
          },
          Table: {
            /* here is your component tokens */
            headerColor: "#fff",
            headerSplitColor: "#E35C40",
            rowHoverBg: "#280274",
            colorBgContainer: "#3652AD",
            bodySortBg: "#E9F6FF",
            colorText: "#fff",
          },
          Form: {
            labelColor: "#FE7A36",
          },
          Modal: {
            contentBg: "#E9F6FF",
            headerBg: "#E9F6FF",
            titleColor: "#FE7A36",
          },
          Input: {
            colorBgContainer: "#E9F6FF",
            activeBorderColor: "#3652AD",
            hoverBorderColor: "#3652AD",
          },
          Radio: {
            colorText: "#FE7A36",
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
              background: "#E9F6FF",
            }}
          />
          <Content
            style={{
              margin: "0 16px",
              backgroundColor: "#E9F6FF",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: "#E9F6FF",
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
