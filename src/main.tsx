import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";

if (process.env.NODE_ENV === "development") {
  if (
    typeof process !== "undefined" &&
    process?.env?.REACT_APP_TEST_ENV === "true"
  ) {
    // const { worker } = require("./mock/browser");
    import("./mock/browser").then(({ worker }) => {
      worker.start();
    });
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
