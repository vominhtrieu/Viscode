import React from "react";
import { Button } from "antd";
import { CaretRightOutlined, StopOutlined } from "@ant-design/icons";
import ScrollToBottom from "react-scroll-to-bottom";
import getWorkerCode from "./worker";
import "./terminal.css";

const getWebWorker = (code) => {
  const blob = new Blob([getWorkerCode(code)]);
  return new Worker(URL.createObjectURL(blob));
};

function Terminal({ code }) {
  const container = React.useRef(null);
  const output = React.useRef(null);
  const [worker, setWorker] = React.useState(null);
  const [running, setRunning] = React.useState(false);
  const caret = React.useRef(null);

  React.useState(() => {
    if (caret.current) {
      caret.current.value = "";
    }
  }, [running]);

  const runCode = () => {
    if (worker) worker.terminate();
    output.current.innerHTML = "";
    caret.current.value = "";
    setRunning(true);
    const temp = getWebWorker(code);
    temp.addEventListener("message", (e) => {
      if (e.data.status !== "done") {
        if (e.data.status === "error") {
          output.current.innerHTML += `<span style="color: #ff4d4f">${e.data.err.message.replaceAll(
            "\\n",
            "<br/>"
          )}</span>`;
          return;
        }
        if (e.data.waitForInput) {
          if (e.data.text !== null) output.current.innerHTML += e.data.text.replaceAll("\\n", "<br/>");
          caret.current.focus();
        } else {
          if (e.data.text !== null) output.current.innerHTML += e.data.text.replaceAll("\\n", "<br/>");
        }
      } else {
        temp.terminate();
        setWorker(null);
        setRunning(false);
        output.current.innerHTML += '<br/><span style="color: lime">Program exited with no error</span>';
      }
    });
    setWorker(temp);
  };

  const stopRunning = () => {
    worker.terminate();
    setRunning(false);
    output.current.innerHTML += '<br/><span style="color: red">Program stopped by user!</span>';
  };

  const sendInput = (e) => {
    if (e.key === "Enter" && worker) {
      output.current.innerHTML += e.target.value + "<br/>";
      worker.postMessage(e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div
      id="terminal"
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
        {running ? (
          <Button
            onClick={stopRunning}
            type="primary"
            danger
            icon={<StopOutlined />}
            title="Stop running"
            style={{ marginLeft: "auto" }}
          >
            Stop
          </Button>
        ) : (
          <Button
            id="run-btn"
            type="primary"
            icon={<CaretRightOutlined />}
            title="Run code in terminal"
            onClick={runCode}
            style={{ marginLeft: "auto" }}
          >
            Run
          </Button>
        )}
      </div>

      <div
        style={{ backgroundColor: "black", padding: 10, height: "100%", overflow: "auto" }}
        onClick={() => caret.current.focus()}
      >
        <pre style={{ color: "rgba(255,255,255,0.9)" }}>
          Viscode Terminal (c) - All Rights Reserved
          <br />
          <span ref={output}></span>
          <input
            ref={caret}
            onKeyDown={sendInput}
            style={{
              display: "inline",
              whiteSpace: "pre-wrap",
              border: "none",
              lineHeight: 1,
              padding: 0,
              background: "none",
              outline: "none",
            }}
            type="text"
          />
        </pre>
      </div>
    </div>
  );
}

export default Terminal;
