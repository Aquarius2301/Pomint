import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import "@fontsource/dseg7/400.css";
import "@fontsource/orbitron/500.css";
import { App } from "@/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
