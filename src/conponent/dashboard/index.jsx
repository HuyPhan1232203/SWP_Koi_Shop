import React, { useState } from "react";
import {
  ContainerOutlined,
  IdcardOutlined,
  ProductOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { Header, Content, Footer, Sider } = Layout;
const username = sessionStorage.getItem("username");

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={`/dashboard/${key}`}>{label}</Link>,
  };
}
const items = [
  getItem("Koi List", "koilist", <ProductOutlined />),
  getItem("Voucher List", "voucher", <ContainerOutlined />),
  getItem("Staff List", "staff", <IdcardOutlined />),
  getItem("Breeds", "breeds", <ProfileOutlined />),
];

const Dashboard = () => {
  const nav = useNavigate();
  const showName = () => {
    if (username) {
      return (
        <h4 style={{ fontFamily: "serif", color: "red" }}>
          Author: {username}
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
    nav("/");
  };
  return (
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
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {showName()}
            <Button
              style={{
                marginLeft: "1300px",
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
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
