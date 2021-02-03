import { Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import React from "react";
import "./terminal.css";

function Terminal({ code }) {
  const caret = React.useRef(null);
  const container = React.useRef(null);
  const output = React.useRef(null);

  const runCode = () => {
    output.current.innerHTML = "";
    setTimeout(() => {
      window.alert = (text) => (output.current.innerHTML += text);
      window.prompt = (text) => (output.current.innerHTML += text);
      let actualCode = `setTimeout(()=> {${code}`;
      actualCode += `window.alert("<br/><span style='color: #51c2d5'>Program exited with no error</span>");`;
      actualCode += `}, 0);`;
      // eslint-disable-next-line
      eval(actualCode);
    }, 0);
  };

  React.useEffect(() => {
    setInterval(() => {
      caret.current.style.display = caret.current.style.display === "none" ? "inline" : "none";
    }, 800);
  }, []);

  return (
    <div
      ref={container}
      style={{
        height: "100%",
        display: "flex",
        flexFlow: "column",
        background: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: "5px",
          borderBottom: "1px solid #cecece",
        }}
      >
        <h3 style={{ marginBottom: 0 }}>Terminal</h3>
        <Button
          type="primary"
          icon={<CaretRightOutlined />}
          title="Run code in terminal"
          onClick={runCode}
          style={{ marginLeft: "auto" }}
        >
          Run
        </Button>
      </div>

      <div style={{ backgroundColor: "black", padding: 10, height: "100%", overflow: "auto" }}>
        <pre style={{ color: "rgba(255,255,255,0.9)" }}>
          Viscode Terminal (c) - All Rights Reserved
          <br />
          <span ref={output}></span>
          <span ref={caret}>_</span>
        </pre>
      </div>
    </div>
  );
}

export default Terminal;
