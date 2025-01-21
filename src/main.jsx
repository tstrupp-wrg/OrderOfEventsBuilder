import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { WebSocketProvider } from "./context/WebSocketContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <WebSocketProvider>
    <App />
  </WebSocketProvider>
);
