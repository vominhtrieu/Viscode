import { Layout } from "antd";
import BlocklyComponent, { Block, Category } from "./Blockly";
import "antd/dist/antd.css";
import "blockly/javascript";

function App() {
  return (
    <Layout style={{ height: "100vh" }}>
      <BlocklyComponent
        readOnly={false}
        move={{
          scrollbars: true,
          drag: true,
          wheel: true,
        }}
        initialXml={`<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`}
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
          <Block type="lists_create_empty"></Block>
          <Block type="lists_create_with"></Block>
          <Block type="lists_repeat"></Block>
          <Block type="lists_length"></Block>
          <Block type="lists_isEmpty"></Block>
        </Category>
      </BlocklyComponent>
    </Layout>
  );
}

export default App;
