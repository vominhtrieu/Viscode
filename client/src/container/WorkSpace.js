import React from "react";
import Terminal from "../components/Terminal";
import { Layout, Menu, Tabs } from "antd";
import BlocklyComponent, {
  Block,
  Category,
} from "../components/BlocklyComponent";
import "blockly/javascript";
import Blockly from "blockly/core";
import ExportArea from "../components/ExportArea";
import SubMenu from "antd/lib/menu/SubMenu";
const { Content, Footer } = Layout;
const { TabPane } = Tabs;

function WorkSpace() {
  const defaultTitle = "Untitled Workspace";
  const [code, setCode] = React.useState("");
  const [consoleOutput, setConsoleOutput] = React.useState("");
  const defaultWorkspace = {
    title: defaultTitle,
    key: "1",
    xml: "<xml xmlns='http://www.w3.org/1999/xhtml'></xml>",
  };
  const [activeKey, setActiveKey] = React.useState(defaultWorkspace.key);
  const [workspaces, setWorkspaces] = React.useState([defaultWorkspace]);
  const [xml, setXml] = React.useState(defaultWorkspace.xml);
  const onWorkSpaceChange = (code) => setCode(code);
  const runCode = () => {
    setConsoleOutput("");
    window.alert = (text) => setConsoleOutput((output) => output + "\n" + text);
    eval(code);
  };

  const updateXml = (dom) => {
    const tabPanes = [...workspaces];
    const currentWorkspace = tabPanes.find(tab => tab.key === activeKey);
    currentWorkspace.xml = Blockly.Xml.domToPrettyText(dom);
    setWorkspaces([...tabPanes]);
  };

  const saveBlocks = () => {
    const element = document.createElement("a");
    const file = new Blob([workspaces.find(workspace => workspace.key === activeKey).xml], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = workspaces.find(element => element.key === activeKey).title + ".xml";
    document.body.appendChild(element);
    element.click();
  };

  const onChange = (newActiveKey) => {
    if (newActiveKey !== activeKey) {
      setActiveKey(newActiveKey);
      setXml(workspaces.find(workspace => workspace.key === newActiveKey).xml);
    }
  };

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

    setXml(defaultWorkspace.xml);
    setActiveKey(newActiveKey);
    setWorkspaces((workspaces) => [
      ...workspaces,
      {
        title: defaultTitle,
        key: newActiveKey,
        xml: "<xml xmlns='http://www.w3.org/1999/xhtml'></xml>",
      },
    ]);
  };

  //remove workspace
  const remove = targetKey => {
    let newActiveKey = activeKey;

    let newIndex;
    workspaces.forEach((workspace, i) => {
      if (workspace.key === targetKey) {
        newIndex = i - 1;
      }
    })
    const newTabPanes = workspaces.filter(workspace => workspace.key !== targetKey);
    if (newTabPanes.length && newActiveKey === targetKey) {
      if (newIndex >= 0) {
        newActiveKey = newTabPanes[newIndex].key;
      } else {
        newActiveKey = newTabPanes[0].key;
      }
    }

    setActiveKey(newActiveKey);
    setWorkspaces([...newTabPanes])
  }

  return (
    <>
      <Menu
        mode="horizontal"
        style={{ width: "100%", height: "50px", position: "fixed" }}
      >
        <SubMenu title="File">
          <Menu.Item style={{ cursor: "not-allowed" }}>New File</Menu.Item>
          <Menu.Item style={{ cursor: "not-allowed" }}>Open File</Menu.Item>
          <Menu.Item onClick={saveBlocks}>Save File</Menu.Item>
          <Menu.Item style={{ cursor: "not-allowed" }}>Close File</Menu.Item>
        </SubMenu>
        <Menu.Item style={{ cursor: "not-allowed" }}>Help</Menu.Item>
      </Menu>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          paddingTop: "50px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "75%",
            resize: "horizontal",
            overflow: "auto",
            borderRight: "1px solid #c6c6c6",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tabs
            type="editable-card"
            activeKey={activeKey}
            onEdit={onEdit}
            onChange={onChange}
          >
            {workspaces.map((workspace) => (
              <TabPane tab={workspace.title} key={workspace.key}></TabPane>
            ))}
          </Tabs>
          <BlocklyComponent
            readOnly={false}
            move={{
              scrollbars: true,
              drag: true,
              wheel: true,
            }}
            // initialXml={`<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`}
            inititalXml={xml}
            onWorkSpaceChange={onWorkSpaceChange}
            updateXml={updateXml}
          >
            <Category name="Variables" categorystyle="variable_category">
              <Block type="variables_get"></Block>
              <Block type="variables_set"></Block>
            </Category>
            <Category name="Procedures" categorystyle="procedure_category">
              <Block type="procedures_defnoreturn"></Block>
              <Block type="procedures_defreturn"></Block>
              <Block type="procedures_mutatorcontainer"></Block>
              <Block type="procedures_mutatorarg"></Block>
              <Block type="procedures_callnoreturn"></Block>
              <Block type="procedures_callreturn"></Block>
            </Category>
            <Category name="Text" categorystyle="text_category">
              <Block type="text_print"></Block>
              <Block type="text"></Block>
              <Block type="text_length"></Block>
              <Block type="text_multiline"></Block>
              <Block type="text_join"></Block>
              <Block type="text_append"></Block>
            </Category>
            <Category name="Loop" categorystyle="loop_category">
              <Block
                type="controls_whileUntil"
                blockstyle="list_blocks"
              ></Block>
              <Block type="controls_repeat"></Block>
              <Block type="controls_for"></Block>
            </Category>
            <Category name="Logic" categorystyle="logic_category">
              <Block type="controls_if"></Block>
              <Block type="logic_compare"></Block>
              <Block type="logic_operation"></Block>
              <Block type="logic_boolean"></Block>
            </Category>
            <Category name="Math" categorystyle="math_category">
              <Block type="math_number"></Block>
              <Block type="math_arithmetic"></Block>
              <Block type="math_modulo"></Block>
              <Block type="math_single"></Block>
              <Block type="math_trig"></Block>
              <Block type="math_constant"></Block>
              <Block type="math_number_property"></Block>
            </Category>
            <Category name="List" categorystyle="list_category">
              <Block type="lists_create_empty"></Block>
              <Block type="lists_create_with"></Block>
              <Block type="lists_repeat"></Block>
              <Block type="lists_length"></Block>
              <Block type="lists_isEmpty"></Block>
            </Category>
          </BlocklyComponent>
        </div>
        <Layout style={{ height: "100%", width: "25%" }}>
          <Content
            style={{
              backgroundColor: "black",
              height: "30%",
              padding: "5px 10px",
            }}
          >
            <Terminal consoleOutput={consoleOutput} />
          </Content>
          <Content
            style={{ backgroundColor: "white", height: "70%", border: "none" }}
          >
            <ExportArea code={code} runCode={runCode} />
          </Content>
          <Footer
            style={{
              height: "5%",
              padding: "5px 10px",
              borderTop: "1px solid #cacaca",
              textAlign: "center",
            }}
          >
            Võ Minh Triều - Nguyễn Hoàng Trung - 2020
          </Footer>
        </Layout>
      </div>
    </>
  );
}

export default WorkSpace;
