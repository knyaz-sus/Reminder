import "./global.css";
import { createRoot } from "react-dom/client";
import { Provider } from "@/context/provider";
import { App } from "./app/app";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <App />
  </Provider>
);
