import "./App.css";
import React from "react";
import { Layout, Menu, Tabs } from "antd";
import WorkSpace, { DEFAULT_TITLE, DEFAULT_WORKSPACE } from "./container/WorkSpace";
import { Content } from "antd/lib/layout/layout";
const { Header } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

function App() {
  const [activeKey, setActiveKey] = React.useState(DEFAULT_WORKSPACE.key);
  const [workspaces, setWorkspaces] = React.useState([DEFAULT_WORKSPACE]);

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else if (action === "remove") {
      remove(targetKey);
    }
  };

  //add new workspace
  const add = () => {
    const tabPanes = [...workspaces];
    const newActiveKey = (+tabPanes[tabPanes.length - 1].key + 1).toString();

    setActiveKey(newActiveKey);
    setWorkspaces((workspaces) => [
      ...workspaces,
      {
        title: DEFAULT_TITLE,
        key: newActiveKey,
        xml: DEFAULT_WORKSPACE.xml,
      },
    ]);
  };

  //remove workspace
  const remove = (targetKey) => {
    let newActiveKey = activeKey;

    let newIndex;
    workspaces.forEach((workspace, i) => {
      if (workspace.key === targetKey) {
        newIndex = i - 1;
      }
    });
    const newTabPanes = workspaces.filter((workspace) => workspace.key !== targetKey);
    if (newTabPanes.length && newActiveKey === targetKey) {
      if (newIndex >= 0) {
        newActiveKey = newTabPanes[newIndex].key;
      } else {
        newActiveKey = newTabPanes[0].key;
      }
    }

    setActiveKey(newActiveKey);
    setWorkspaces([...newTabPanes]);
  };

  const saveBlocks = () => {
    const element = document.createElement("a");
    const file = new Blob([workspaces.find((workspace) => workspace.key === activeKey).xml.toString()], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = workspaces.find((element) => element.key === activeKey).title + ".xml";
    document.body.appendChild(element);
    element.click();
  };

  const onChange = (newActiveKey) => {
    if (newActiveKey !== activeKey) {
      setActiveKey(newActiveKey);
    }
  };

  const updateXml = (xml) => {
    setWorkspaces((workspaces) =>
      workspaces.map((workspace) => {
        if (workspace.key === activeKey) {
          return Object.assign({}, workspace, { xml });
        }
        return workspace;
      })
    );
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content style={{ padding: 0, backgroundColor: "#f0f2f5" }}>
        <Menu mode="horizontal" style={{ backgroundColor: "#f0f2f5" }}>
          <SubMenu title="File">
            <Menu.Item style={{ cursor: "not-allowed" }}>New File</Menu.Item>
            <Menu.Item style={{ cursor: "not-allowed" }}>Open File</Menu.Item>
            <Menu.Item onClick={saveBlocks}>Save File</Menu.Item>
            <Menu.Item style={{ cursor: "not-allowed" }}>Close File</Menu.Item>
          </SubMenu>
          <Menu.Item style={{ cursor: "not-allowed" }}>Help</Menu.Item>
        </Menu>
      </Content>
      <Content>
        <Tabs
          style={{ marginBottom: 0 }}
          type="editable-card"
          activeKey={activeKey}
          onEdit={onEdit}
          onChange={onChange}
        >
          {workspaces.map((workspace) => (
            <TabPane tab={workspace.title} key={workspace.key} style={{ height: "calc(100vh - 31.82px - 33.82px)" }}>
              <WorkSpace updateXml={updateXml} />
            </TabPane>
          ))}
        </Tabs>
      </Content>
    </Layout>
  );
}

export default App;
