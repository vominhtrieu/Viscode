import React from "react";
import "./blocklyComponent.css";
import Blockly from "blockly/core";
import "blockly/blocks";
import BlocklyJavaScript from "blockly/javascript";
import locale from "blockly/msg/en";
Blockly.setLocale(locale);

function BlocklyComponent(props) {
  const toolbox = React.useRef(null);
  const editor = React.useRef(null);
  const { initialXml, children, onWorkSpaceChange, updateXml, ...rest } = props;

  React.useEffect(() => {
    const workSpace = Blockly.inject(editor.current, {
      toolbox: toolbox.current,
      ...rest,
    });
    workSpace.addChangeListener(() => {
      const code = BlocklyJavaScript.workspaceToCode(workSpace);
      onWorkSpaceChange(code);
      updateXml(Blockly.Xml.workspaceToDom(workSpace));
    });
    if (initialXml) {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), workSpace);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <xml id="toolbox" is="blockly" style={{ display: "none" }} ref={toolbox}>
        {children}
      </xml>
      <div ref={editor} id="editor"></div>
    </>
  );
}

const Block = ({ children, ...props }) => React.createElement("block", { ...props, is: "blockly" }, children);
const Category = ({ children, ...props }) => React.createElement("category", { ...props, is: "blockly" }, children);

export { Block, Category };
export default BlocklyComponent;
