import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./overview.css";

function Overview() {
  const [data, setData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [breed, setBreed] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/dashboard/stats");
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBreed = async () => {
    try {
      const response = await api.get("/dashboard/stats");
      console.log(response.data);
      const formatData = response?.data.topBreeds?.map((item) => ({
        name: `${item?.BreedName}`,
        TotalSold: `${item?.TotalSold}`,
      }));
      console.log(formatData);
      setBreed(formatData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await api.get("/dashboard/revenue/monthly");
      console.log(response.data.RevenueData);
      const formatData = response?.data?.RevenueData?.map((item) => ({
        name: `${item?.Month}/${item?.Year}`,
        Revenue: `${item?.Total}`,
      }));
      setMonthlyData(formatData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMonthlyData();
    fetchBreed();
  }, []);
  return (
    <div>
      <Row gutter={16} style={{ marginTop: "50px" }}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Customer"
              value={data?.CUSTOMER}
              valueStyle={{
                color: "orange",
              }}
              prefix={<UserOutlined />}
              suffix=""
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Staff"
              value={data?.STAFF}
              valueStyle={{
                color: "#3f6600",
              }}
              prefix={<ShoppingOutlined />}
              suffix=""
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Sold Kois"
              value={data?.SoldKois}
              valueStyle={{
                color: "red",
              }}
              prefix={<ShoppingOutlined />}
              suffix=""
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Available Kois"
              value={data?.AvailableKois}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ShoppingOutlined />}
              suffix=""
            />
          </Card>
        </Col>
      </Row>
      <div className="chart-section">
        <h3>Product</h3>
        <BarChart className="bar" width={800} height={400} data={breed}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="TotalSold" fill="#82ca9d" />
        </BarChart>
        <h3>Revenue</h3>
        <BarChart className="bar" width={800} height={400} data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Revenue" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default Overview;
