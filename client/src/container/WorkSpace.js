import React from "react";
import Terminal from "../components/Terminal";
import { Layout, message, Tabs } from "antd";
import BlocklyComponent, { Block, Category } from "../components/BlocklyComponent";
import "blockly/javascript";
import "../blocks/variables";
import "./workspace.css";
import ExportArea from "../components/ExportArea";
import axios from "axios";
import { API_HOST } from "../config/constant";
import { useParams } from "react-router-dom";
import AuthHeader from "../services/auth-header"
const { Content, Footer } = Layout;

const DEFAULT_TITLE = "Untitled Workspace";

const DEFAULT_WORKSPACE = {
  title: DEFAULT_TITLE,
  key: "1",
  xml: "<xml xmlns='http://www.w3.org/1999/xhtml'></xml>",
};

function WorkSpace({ updateXml }) {
  const [xml, setXml] = React.useState(DEFAULT_WORKSPACE.xml);
  const [code, setCode] = React.useState("");
  const { id } = useParams();
  const onWorkSpaceChange = (code) => {
    setCode(code);
  };

  React.useEffect(() => {
    if (id)
      axios
        .get(`${API_HOST}/my-files/files/${id}`, {
          headers: AuthHeader()
        })
        .then(({ data }) => setXml(data.data))
        .catch((err) => message.error(err.message));
  }, [id]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
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
        <BlocklyComponent
          readOnly={false}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true,
          }}
          initialXml={xml}
          onWorkSpaceChange={onWorkSpaceChange}
          updateXml={updateXml}
          fileId={id}
        >
          <Category name="Variables" categorystyle="variable_category">
            <Block type="variables_get"></Block>
            <Block type="variables_set"></Block>
            <Block type="variables_null"></Block>
          </Category>
          <Category name="Procedures" categorystyle="procedure_category">
            <Block type="procedures_defnoreturn"></Block>
            <Block type="procedures_defreturn"></Block>
            <Block type="procedures_callnoreturn"></Block>
            <Block type="procedures_callreturn"></Block>
          </Category>
          <Category name="Text" categorystyle="text_category">
            <Block type="text_print"></Block>
            <Block type="text_prompt"></Block>
            <Block type="text"></Block>
            <Block type="text_length"></Block>
            <Block type="text_multiline"></Block>
            <Block type="text_join"></Block>
            <Block type="text_append"></Block>
          </Category>
          <Category name="Loop" categorystyle="loop_category">
            <Block type="controls_whileUntil" blockstyle="list_blocks"></Block>
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
            <Block type="lists_getIndex"></Block>
            <Block type="lists_create_empty"></Block>
            <Block type="lists_create_with"></Block>
            <Block type="lists_repeat"></Block>
            <Block type="lists_length"></Block>
            <Block type="lists_isEmpty"></Block>
          </Category>
        </BlocklyComponent>
      </div>
      <Layout style={{ height: "100%", width: "25%" }}>
        <Content style={{ height: "35%" }}>
          <Terminal code={code} />
        </Content>
        <Content style={{ backgroundColor: "white", height: "60%", border: "none" }}>
          <ExportArea code={code} />
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
  );
}

export default WorkSpace;
export { DEFAULT_TITLE, DEFAULT_WORKSPACE };
