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
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    "Orders List",
    "orderlist",
    <ShoppingOutlined style={{ color: "#fff" }} />
  ),
  getItem(
    "Blog List",
    "bloglist",
    <SnippetsOutlined style={{ color: "#fff" }} />
  ),
  getItem("Profile", "3", <ProfileOutlined style={{ color: "#fff" }} />),
];
const DashboardStaff = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
          colorText: "#fff",
        },
        components: {
          Menu: {
            darkItemBg: "#E35C40",
            darkItemSelectedBg: "#fff",
            darkItemSelectedColor: "#E35C40",
            darkItemColor: "#fff",
          },
          Button: {
            /* here is your component tokens */
            defaultHoverBorderColor: "#E35C40",
            defaultHoverColor: "#E35C40",
          },
          Layout: {
            /* here is your component tokens */
            siderBg: "#E35C40",
            triggerBg: "#fff",
            triggerColor: "#E35C40",
            lightTriggerColor: "#fff",
          },
          Table: {
            /* here is your component tokens */
            headerColor: "#E35C40",
            headerSplitColor: "#E35C40",
            rowHoverBg: "#ECDFDB",
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
            theme="#E35C40"
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
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
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
    </ConfigProvider>
  );
};
export default DashboardStaff;
