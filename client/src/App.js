import "./App.css";
import React from "react";
import { Button, Layout, Menu, Dropdown } from "antd";
import WorkSpace, { DEFAULT_WORKSPACE } from "./container/WorkSpace";
import {
  FileOutlined,
  FolderOpenOutlined,
  SaveOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
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

  const fileMenu = (
    <Menu style={{ width: 150 }}>
      <Menu.Item className="menu-item" icon={<FileOutlined className="menu-item-icon" />}>
        <a href="/" target="_blank">
          New File
        </a>
      </Menu.Item>
      <Menu.Item
        className="menu-item"
        icon={<FolderOpenOutlined className="menu-item-icon" />}
        onClick={() => setOpenModalVisible(true)}
      >
        Open File
      </Menu.Item>
      <Menu.Item className="menu-item" icon={<SaveOutlined className="menu-item-icon" />} onClick={saveBlocks}>
        Save File
      </Menu.Item>
      <Menu.Item
        danger
        className="menu-item"
        icon={<CloseCircleOutlined className="menu-item-icon" />}
        onClick={closeFile}
      >
        Close File
      </Menu.Item>
    </Menu>
  );

  const helpMenu = (
    <Menu style={{ width: 150 }}>
      <Menu.Item
        className="menu-item"
        icon={<QuestionCircleOutlined className="menu-item-icon" />}
        onClick={() => setOpenModalVisible(true)}
      >
        How to use?
      </Menu.Item>
      <Menu.Item icon={<InfoCircleOutlined className="menu-item-icon" />} className="menu-item" onClick={saveBlocks}>
        About us
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <OpenModal visible={openModalVisible} onClose={() => setOpenModalVisible(false)} />
      <SaveModal visible={saveModalVisible} xml={workspace.xml} onClose={() => setSaveModalVisible(false)} />
      <SignInModal visible={signInModalVisible} onClose={() => setSignInModalVisible(false)} />

      <Layout style={{ height: "100vh" }}>
        <Header
          style={{ height: 48, display: "flex", alignItems: "center", padding: "0 5px", backgroundColor: "white" }}
        >
          <Dropdown overlay={fileMenu}>
            <Button type="text">File</Button>
          </Dropdown>
          <Dropdown overlay={helpMenu}>
            <Button type="text">Help</Button>
          </Dropdown>
          <div style={{ marginLeft: "auto", marginRight: 5 }}>
            {AuthService.getCurrentUser() ? (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      icon={<LogoutOutlined className="menu-item-con" />}
                      danger
                      className="menu-item"
                      onClick={AuthService.logout}
                    >
                      Log out
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button type="text" icon={<UserOutlined className="menu-item-icon" />}>
                  {AuthService.getCurrentUser().username}
                </Button>
              </Dropdown>
            ) : (
              <div>
                <Button type="text" onClick={() => setSignInModalVisible(true)}>
                  Log In
                </Button>
                <Button type="text" onClick={() => setSignInModalVisible(true)}>
                  Register
                </Button>
              </div>
            )}
          </div>
        </Header>
        <Content style={{ borderTop: "1px solid #C6C6C6" }}>
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
