import React, { useState } from "react";
import {
  ContainerOutlined,
  IdcardOutlined,
  ProductOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Input,
  Layout,
  Menu,
  theme,
} from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { Header, Content, Footer, Sider } = Layout;
const username = sessionStorage.getItem("username");

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link style={{color: "#fff"}} to={`/dashboard/${key}`}>{label}</Link>,
  };
}
const items = [
  getItem("Koi List", "koilist", <ProductOutlined style={{color: "#fff"}} />),
  getItem("Voucher List", "voucher", <ContainerOutlined style={{color: "#fff"}} />),
  getItem("Staff List", "staff", <IdcardOutlined style={{color: "#fff"}} />),
  getItem("Breeds", "breeds", <ProfileOutlined style={{color: "#fff"}} />),
];

const Dashboard = () => {
  const nav = useNavigate();

  const showName = () => {
    if (username) {
      return (
        <h4
          style={{
            fontFamily: "serif",
            color: "#fff",
            border: "1px solid #E35C40",
            backgroundColor: "#E35C40",
            borderRadius: "10px",
            paddingBottom: "10px",
            paddingTop: "10px",
            width: "300px",
            textAlign: "center",
          }}
        >
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
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
          colorText: "black",
          colorLink: "#fff",
        },
        components: {
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
    </ConfigProvider>
  );
};
export default Dashboard;
