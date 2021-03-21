import React from "react";
import { Button, Layout } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function intellisense(code) {
  code = code.replaceAll("function", `<i style="color: #1687a7">function</i>`);
  code = code.replaceAll("var", `<i style="color: #008dff">var</i>`);
  code = code.replaceAll("for", `<i style="color: #ff5e78">for</i>`);
  code = code.replaceAll("return", `<i style="color: #161d6f">return</i>`);
  code = code.replaceAll("while", `<i style="color: #0a043c">while</i>`);
  code = code.replaceAll(/\/\/(.)+\n/gi, (old) => `<i style="color: green">${old}</i>`);
  return code;
}

function ExportArea(props) {
  const container = React.useRef(null);
  const code = intellisense(props.code);

  const exportFunc = () => {
    var pom = document.createElement("a");
    pom.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(props.code));
    pom.setAttribute("download", "download.js");

    if (document.createEvent) {
      var event = document.createEvent("MouseEvents");
      event.initEvent("click", true, true);
      pom.dispatchEvent(event);
    } else {
      pom.click();
    }
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Layout style={{ backgroundColor: "white", width: "100%", height: "100%", display: "flex" }}>
        <div style={{ width: "100%", display: "flex", alignItems: "center", padding: 5 }}>
          <b>Javascript</b>
          <Button
            style={{ marginLeft: "auto" }}
            type="primary"
            icon={<DownloadOutlined />}
            title="Download all code as a file"
            onClick={exportFunc}
          >
            Export
          </Button>
        </div>

        <p
          ref={container}
          id="codeArea"
          dangerouslySetInnerHTML={{ __html: code }}
          style={{ overflowY: "auto", borderTop: "1px solid #d9d9d9", whiteSpace: "pre", padding: 5 }}
        ></p>
      </Layout>
    </div>
  );
}

export default ExportArea;
