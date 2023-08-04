import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TimerContext from "./context/timerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TimerContext>
      <App />
    </TimerContext>
  </React.StrictMode>
);
