import React from "react";
import { Space, Select, Button, Layout } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
const { Option } = Select;

function intellisense(code) {
  code = code.replaceAll("function", `<i style="color: #1687a7">function</i>`);
  code = code.replaceAll("var", `<i style="color: #008dff">var</i>`);
  code = code.replaceAll("for", `<i style="color: #ff5e78">for</i>`);
  code = code.replaceAll("return", `<i style="color: #161d6f">return</i>`);
  code = code.replaceAll("while", `<i style="color: #0a043c">while</i>`);
  code = code.replaceAll(/\/\/(.)+\n/gi, (old) => `<i style="color: green">${old}</i>`);
  return code;
}

function ExportArea({ code }) {
  const container = React.useRef(null);
  code = intellisense(code);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Layout style={{ backgroundColor: "white", width: "100%", height: "100%", display: "flex" }}>
        <Space style={{ marginLeft: "auto", padding: 5 }}>
          <Select defaultValue="js" style={{ width: 120 }}>
            <Option value="js">Javascript</Option>
            <Option value="cpp">C++</Option>
            <Option value="py">Python</Option>
          </Select>
          <Button type="primary" icon={<DownloadOutlined />} title="Download all code as a file">
            Export
          </Button>
        </Space>

        <p
          ref={container}
          id="codeArea"
          dangerouslySetInnerHTML={{ __html: code }}
          style={{ overflowY: "auto", borderTop: "1px solid #d9d9d9", whiteSpace: "pre", padding: 5 }}
        ></p>
      </Layout>
    </div>
  );
}

export default ExportArea;
