import { useCallback, type DragEvent } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";

import { selector, useStore } from "../../store";
import { useDragAndDrop } from "../../DragAndDropContext";
import { SourceNode } from "../nodes/SourceNode";
import { LayerNode } from "../nodes/LayerNode";

const nodeTypes = {
  sourceNode: SourceNode,
  layerNode: LayerNode,
};

export function Flow() {
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
      
      // Initialize node data based on type
      let data;
      if (type === 'sourceNode') {
        data = { url: '' };
      } else {
        data = { label: `${type} node` };
      }
      
      const newNode = {
        id: window.crypto.randomUUID(),
        type,
        position,
        data,
        origin: [0.5, 0.5] as [number, number],
      };

      onNodesChange([{ item: newNode, type: "add" }]);
    },
    [onNodesChange, screenToFlowPosition, type],
  );

  return (
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
  );
}