import { Menu, Layout, Col, Row, Typography, Select, Button, Space } from "antd";
import { BranchesOutlined, QuestionCircleOutlined, NotificationOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;
const { Option } = Select;

function App() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider style={{ height: "100%" }} width={300} className="site-layout-background">
        <Layout style={{ height: "100%" }}>
          <Content>
            <Menu mode="inline" style={{ height: "100%" }}>
              <SubMenu key="sub1" icon={<QuestionCircleOutlined />} title="Logic">
                <Menu.Item key="1">Equals</Menu.Item>
                <Menu.Item key="2">Not Equals</Menu.Item>
                <Menu.Item key="3">Greater</Menu.Item>
                <Menu.Item key="4">Less</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<BranchesOutlined />} title="Branches">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="Operations">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Content>
          <Text style={{ textAlign: "center", backgroundColor: "white", padding: 10 }}>
            Võ Minh Triều - Nguyễn Hoàng Trung
          </Text>
        </Layout>
      </Sider>
      <Layout>
        <Content className="site-layout-background"></Content>
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
                <Content style={{ overflowY: "auto" }}></Content>
              </Layout>
            </Content>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
}

export default App;
