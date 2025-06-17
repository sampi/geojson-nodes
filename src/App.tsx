import { useCallback, type DragEvent } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";

import { selector, useStore } from "./store";
import { NodesDrawer } from "./components/NodesDrawer/NodesDrawer";
import { useDragAndDrop } from "./DragAndDropContext";
import { SourceNode } from "./components/nodes/SourceNode";
import { LayerNode } from "./components/nodes/LayerNode";

const nodeTypes = {
  sourceNode: SourceNode,
  layerNode: LayerNode,
};

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector),
  );
  const { screenToFlowPosition } = useReactFlow();

  const [type] = useDragAndDrop();

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer!.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: window.crypto.randomUUID(),
        type,
        position,
        data: { label: `${type} node` },
        origin: [0.5, 0.5],
      };

      onNodesChange([{ item: newNode, type: "add" }]);
    },
    [onNodesChange, screenToFlowPosition, type],
  );

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <NodesDrawer />
      <main style={{ flexGrow: 1, width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background gap={16} size={1} />
        </ReactFlow>
      </main>
    </div>
  );
}
