import React from "react";
import "./blocklyComponent.css";
import Blockly from "blockly/core";
import "blockly/blocks";
import BlocklyJavaScript from "blockly/javascript";
import locale from "blockly/msg/en";
import { io } from "socket.io-client";
import { message } from "antd";
Blockly.setLocale(locale);
const socket = io("http://localhost:5000");

function BlocklyComponent(props) {
  const [workspace, setWorkspace] = React.useState(null);
  const toolbox = React.useRef(null);
  const editor = React.useRef(null);
  const { initialXml, children, updateXml, onWorkSpaceChange, ...rest } = props;

  React.useEffect(() => {
    const tempWorkSpace = Blockly.inject(editor.current, {
      toolbox: toolbox.current,
      ...rest,
    });

    const onChange = (event) => {
      if (event.type !== "finished_loading" && !event.isUiEvent) {
        const code = BlocklyJavaScript.workspaceToCode(tempWorkSpace);
        onWorkSpaceChange(code);
        updateXml(Blockly.Xml.workspaceToDom(tempWorkSpace));
        socket.emit("eventTriggered", event.toJson());
      }
    };

    socket.on("eventMirrored", (jsonEvent) => {
      Blockly.Events.disable();
      Blockly.Events.fromJson(jsonEvent, tempWorkSpace).run(true);
      Blockly.Events.enable();
      const code = BlocklyJavaScript.workspaceToCode(tempWorkSpace);
      onWorkSpaceChange(code);
      updateXml(Blockly.Xml.workspaceToDom(tempWorkSpace));
    });

    if (initialXml) {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), tempWorkSpace);
    }

    tempWorkSpace.addChangeListener(onChange);
    setWorkspace(tempWorkSpace);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (workspace) {
      Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(initialXml), workspace);
    }
    // eslint-disable-next-line
  }, [initialXml]);

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
