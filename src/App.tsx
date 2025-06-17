import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";

import { useStore } from "./store";

import { NodesDrawer } from "./components/NodesDrawer/NodesDrawer";
import { Node } from "./components/Node/Node";
import { useDragAndDrop } from "./DragAndDropContext";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector),
  );
  const { screenToFlowPosition } = useReactFlow();

  const [type, setType] = useDragAndDrop();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
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
      };

      onNodesChange([{ item: newNode, type: "add" }]);
    },
    [onNodesChange, screenToFlowPosition, type],
  );

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData("text/plain", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <NodesDrawer>
        <Node />
        <Node />
      </NodesDrawer>
      <main style={{ flexGrow: 1, width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </main>
    </div>
  );
}
