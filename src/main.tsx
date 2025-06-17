import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ReactFlowProvider } from "@xyflow/react";

import App from "./App.tsx";
import { DragAndDropProvider } from "./DragAndDropContext.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactFlowProvider>
      <DragAndDropProvider>
        <App />
      </DragAndDropProvider>
    </ReactFlowProvider>
  </StrictMode>,
);
