import { useEffect, useState } from "react";
import api from "../../../../config/axios";
import { Button, Form, Select } from "antd";

function Unique() {
  const [koiList, setKoiList] = useState([]);
  const [compare, setCompare] = useState(null);
  const [form] = Form.useForm();
  const handleShowCompare = () => {
    if (compare?.priceDifference != null) {
      return (
        <div>
          <div> Price Difference: {compare?.priceDifference}</div>
          <div> Size Difference: {compare?.sizeDifference}</div>
        </div>
      );
    }
  };
  const fetchKoi = async () => {
    const res = await api.get("koi?page=0&size=100");
    const list = [];
    res.data.content.map((koi) => {
      if (koi.quantity == 1) {
        list.push(koi);
      }
    });
    setKoiList(list);
  };
  const handleCompare = async (value) => {
    console.log(value);
    const res = await api.get(
      `koi/compare?id1=${value.a}&id2=${value.b}&comparisonType=unique`
    );
    setCompare(res.data);
  };
  useEffect(() => {
    fetchKoi();
  }, []);
  return (
    <div>
      <h4 className="compare_header text-center">Unique Koi Compare</h4>
      <Form className="form_compare" form={form} onFinish={handleCompare}>
        <Form.Item
          label="Item 1 "
          name="a"
          rules={[{ required: true, message: "please choose" }]}
        >
          <Select>
            {koiList.map((koi) => {
              return (
                <Select.Option key={koi.id} value={koi.id}>
                  {koi.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Item 2 "
          name="b"
          rules={[{ required: true, message: "please choose" }]}
        >
          <Select>
            {koiList.map((koi) => {
              return (
                <Select.Option key={koi.id} value={koi.id}>
                  {koi.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Compare
        </Button>
      </Form>
      {handleShowCompare()}
    </div>
  );
}

export default Unique;
