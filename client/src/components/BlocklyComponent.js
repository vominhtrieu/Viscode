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
  const isFirstRun = React.useRef(true);
  const { initialXml, children, updateXml, onWorkSpaceChange, ...rest } = props;

  const onChange = (event) => {
    const code = BlocklyJavaScript.workspaceToCode(workspace);
    onWorkSpaceChange(code);
    updateXml(Blockly.Xml.workspaceToDom(workspace));
    if (!event.isUiEvent) {
      socket.emit("eventTriggered", event.toJson());
    }
  };

  React.useEffect(() => {
    const workSpace = Blockly.inject(editor.current, {
      toolbox: toolbox.current,
      ...rest,
    });
    //workSpace.addChangeListener(onChange);

    if (initialXml) {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), workSpace);
    }
    setWorkspace(workSpace);

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      workspace.addChangeListener(onChange);
    }
    socket.on("eventMirrored", (jsonEvent) => {
      if (workspace) {
        workspace.removeChangeListener(onChange);
        console.log(jsonEvent);
        console.log(Blockly.Events.fromJson(jsonEvent, workspace));
        Blockly.Events.fromJson(jsonEvent, workspace).run(true);
        const code = BlocklyJavaScript.workspaceToCode(workspace);
        onWorkSpaceChange(code);
        updateXml(Blockly.Xml.workspaceToDom(workspace));
      }
    });
  }, [workspace]);

  React.useEffect(() => {
    if (workspace) {
      Blockly.Xml.clearWorkspaceAndLoadFromXml(
        Blockly.Xml.textToDom(initialXml),
        workspace
      );
    }
    // eslint-disable-next-line
  }, [initialXml]);

  // React.useEffect(() => {
  //   if (!isFirstRun.current) {
  //     socket.on("updateWorkspace", (jsonEvent) => {
  //       if (workspace) {
  //         workspace.removeChangeListener(onChange);
  //         console.log(jsonEvent);
  //         Blockly.Events.fromJson(jsonEvent, workspace).run(true);
  //       }
  //     });
  //   }
  // });

  return (
    <>
      <xml id="toolbox" is="blockly" style={{ display: "none" }} ref={toolbox}>
        {children}
      </xml>
      <div ref={editor} id="editor"></div>
    </>
  );
}

const Block = ({ children, ...props }) =>
  React.createElement("block", { ...props, is: "blockly" }, children);
const Category = ({ children, ...props }) =>
  React.createElement("category", { ...props, is: "blockly" }, children);

export { Block, Category };
export default BlocklyComponent;
