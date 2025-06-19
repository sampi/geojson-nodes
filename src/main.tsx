import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ReactFlowProvider } from "@xyflow/react";

import App from "./App";
import { DragAndDropProvider } from "./contexts/DragAndDrop/DragAndDropProvider";
import { GlobalStyle } from "./GlobalStyle";

import "maplibre-gl/dist/maplibre-gl.css";
import "@xyflow/react/dist/style.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactFlowProvider>
      <DragAndDropProvider>
        <>
          <GlobalStyle />
          <App />
        </>
      </DragAndDropProvider>
    </ReactFlowProvider>
  </StrictMode>,
);
