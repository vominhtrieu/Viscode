import "./index.css";
import React from "react";
import Blockly from "blockly/core";
import "blockly/blocks";
import BlocklyJavaScript from "blockly/javascript"
import locale from "blockly/msg/en";
import { Row, Col, Space, Typography, Select, Button } from "antd";
import Layout from "antd/lib/layout";
const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

Blockly.setLocale(locale);

function BlocklyComponent(props) {
  const toolbox = React.useRef(null);
  const editor = React.useRef(null);
  const { initialXml, children, ...rest } = props;

  React.useEffect(() => {
    const workSpace = Blockly.inject(editor.current, {
      toolbox: toolbox.current,
      ...rest,
    });
    workSpace.addChangeListener(() => {
      const code = BlocklyJavaScript.workspaceToCode(workSpace);
      document.getElementById("codeArea").innerText = code;
    });
    if (initialXml) {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), workSpace);
    }
  }, [initialXml, rest]);

  return (
    <Layout style={{ height: "100%", width: "100%" }}>
      <Content>
        <xml id="toolbox" is="blockly" style={{ display: "none" }} ref={toolbox}>
          {children}
        </xml>
        <div ref={editor} id="editor"></div>
      </Content>
      <Row>
        <Col span={12}>
          <Content style={{ backgroundColor: "black", height: 200, padding: "5px 10px" }}>
            <h3 style={{ color: "white", borderBottom: "1px solid white", width: 300 }}>Viscode Terminal</h3>
            <Text type="success">Compiling...</Text>
          </Content>
        </Col>
        <Col span={12}>
          <Content style={{ backgroundColor: "white", height: 200, padding: "5px 10px" }}>
            <Layout style={{ backgroundColor: "white", width: "100%", height: "100%", display: "flex" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3 style={{ marginBottom: 0, borderBottom: "1px solid rgba(0,0,0,0.3)", width: 150 }}>Export</h3>

                <Space style={{ marginLeft: "auto" }}>
                  <Select defaultValue="js" style={{ width: 120, marginRight: 5 }}>
                    <Option value="js">Javascript</Option>
                    <Option value="cpp">C++</Option>
                    <Option value="py">Python</Option>
                  </Select>
                  <Button type="primary">Download</Button>
                </Space>
              </div>
              <Content style={{ overflowY: "auto" }}>
                <p id="codeArea"></p>
              </Content>
            </Layout>
          </Content>
        </Col>
      </Row>
    </Layout>
  );
}

const Block = ({ children, ...props }) => React.createElement("block", { ...props, is: "blockly" }, children);
const Category = ({ children, ...props }) => React.createElement("category", { ...props, is: "blockly" }, children);

export { Block, Category };
export default BlocklyComponent;
