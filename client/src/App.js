import "./App.css";
import React from "react";
import { Button, Layout, Menu } from "antd";
import WorkSpace, { DEFAULT_WORKSPACE } from "./container/WorkSpace";
import { Content } from "antd/lib/layout/layout";
import OpenModal from "./components/OpenModal";
import SaveModal from "./components/SaveModal";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignInModal from "./components/SignInModal";
import AuthService from "./services/auth.services";
import { UserOutlined } from "@ant-design/icons";
const { Header } = Layout;
const { SubMenu } = Menu;

function App() {
  const [workspace, setWorkspace] = React.useState(DEFAULT_WORKSPACE);
  const [openModalVisible, setOpenModalVisible] = React.useState(false);
  const [saveModalVisible, setSaveModalVisible] = React.useState(false);
  const [signInModalVisible, setSignInModalVisible] = React.useState(false);

  const saveBlocks = () => {
    setSaveModalVisible(true);
  };

  const updateXml = (xml) => {
    setWorkspace(
      Object.assign({}, workspace, {
        xml: new XMLSerializer().serializeToString(xml),
      })
    );
  };

  const closeFile = () => window.close();

  const userMenu = (
    <SubMenu icon={UserOutlined} style={{ float: "right" }}>
      <Menu.Item>Log out</Menu.Item>
    </SubMenu>
  );

  return (
    <>
      <OpenModal
        visible={openModalVisible}
        onClose={() => setOpenModalVisible(false)}
      />
      <SaveModal
        visible={saveModalVisible}
        xml={workspace.xml}
        onClose={() => setSaveModalVisible(false)}
      />
      <SignInModal
        visible={signInModalVisible}
        onClose={() => setSignInModalVisible(false)}
      />
      <Layout style={{ height: "100vh" }}>
        <Header style={{ height: 32, padding: 0, backgroundColor: "#f0f2f5" }}>
          <Menu mode="horizontal" style={{ backgroundColor: "#f0f2f5" }}>
            <SubMenu title="File">
              <Menu.Item style={{ height: 32 }}>
                <a href="/" target="_blank">
                  New File
                </a>
              </Menu.Item>
              <Menu.Item
                onClick={() => setOpenModalVisible(true)}
                style={{ height: 32 }}
              >
                Open File
              </Menu.Item>
              <Menu.Item style={{ height: 32 }} onClick={saveBlocks}>
                Save File
              </Menu.Item>
              <Menu.Item onClick={closeFile} style={{ height: 32 }}>
                Close File
              </Menu.Item>
            </SubMenu>
            <Menu.Item>Help</Menu.Item>

            {AuthService.getCurrentUser() ? (
              <SubMenu icon={<UserOutlined />} title={AuthService.getCurrentUser().username} style={{ float: "right" }}>
                <Menu.Item onClick={AuthService.logout}>Log out</Menu.Item>
              </SubMenu>
            ) : (
              <>
                <Menu.Item style={{ float: "right" }}>
                  <Button onClick={() => setSignInModalVisible(true)} type="primary">
                    Log In
                  </Button>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Header>
        <Content>
          <Router>
            <Switch>
              <Route exact path="/">
                <WorkSpace updateXml={updateXml} />
              </Route>
              <Route path="/:id">
                <WorkSpace updateXml={updateXml} />
              </Route>
              <Route path="*">404 Page not found</Route>
            </Switch>
          </Router>
        </Content>
      </Layout>
    </>
  );
}

export default App;
