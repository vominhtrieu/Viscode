import { Layout } from "antd";
import BlocklyComponent, { Block, Category } from "./Blockly";
import "antd/dist/antd.css";
import "blockly/javascript";

function App() {
  return (
    <Layout style={{ height: "100vh" }}>
      <BlocklyComponent
        readOnly={false}
        media="media/"
        move={{
          scrollbars: true,
          drag: true,
          wheel: true,
        }}
        initialXml={`<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`}
      >
        <Category name="Loop" categorystyle="loop_category">
          <Block type="controls_whileUntil" blockstyle="list_blocks"></Block>
          <Block type="controls_repeat"></Block>
        </Category>
        <Category name="Logic" categorystyle="logic_category">
          <Block type="controls_if"></Block>
          <Block type="logic_compare"></Block>
          <Block type="logic_operation"></Block>
          <Block type="logic_boolean"></Block>
        </Category>
      </BlocklyComponent>
    </Layout>
  );
}

export default App;
