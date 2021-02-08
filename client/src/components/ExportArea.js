import React from "react";
import { Space, Select, Button, Layout } from "antd";
const { Option } = Select;

function ExportArea({ code, runCode }) {
  return (
    <Layout style={{ backgroundColor: "white", width: "100%", height: "100%", display: "flex" }}>
      <Space style={{ marginLeft: "auto", padding: 5 }}>
        <Select defaultValue="js" style={{ width: 120 }}>
          <Option value="js">Javascript</Option>
          <Option value="cpp">C++</Option>
          <Option value="py">Python</Option>
        </Select>
        <Button type="ghost">Download</Button>
        <Button type="primary" onClick={runCode}>
          Run
        </Button>
      </Space>

      <p style={{ overflowY: "auto", borderTop: "1px solid #d9d9d9", whiteSpace: "pre", padding: 5 }}>
        {code}
      </p>
    </Layout>
  );
}

export default ExportArea;
