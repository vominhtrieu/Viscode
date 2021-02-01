import React from "react";
import "./terminal.css";

function Terminal({ consoleOutput }) {
  return (
    <>
      <h3 style={{ color: "white", borderBottom: "1px solid white", width: 200 }}>Viscode Terminal</h3>
      <p style={{ color: "rgba(255,255,255,0.8)" }}>
        {consoleOutput}
        <span className="cursor">_</span>
      </p>
    </>
  );
}

export default Terminal;
