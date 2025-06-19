import { useCallback, type DragEvent } from "react";
import {
  Background,
  Panel,
  ReactFlow,
  useReactFlow,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";

import { useDragAndDrop } from "../../contexts/DragAndDrop/useDragAndDrop";
import { UNIT_WIDTH } from "../../GlobalStyle";
import { DRAWER_UNIT_WIDTH, NodesDrawer } from "../NodesDrawer/NodesDrawer";
import { ActionButton } from "../ActionButton/ActionButton";
import { nodeTypes } from "./nodeTypes";
import { Controls } from "./Controls";
import { MiniMap } from "./MiniMap";
import { GlassPanel } from "./GlassPanel";

const PADDING = UNIT_WIDTH * 6;
const MINIMAP_WIDTH = 200;

const fitViewOptions = {
  padding: {
    // Avoid going under the Node Drawer
    left: `${UNIT_WIDTH * DRAWER_UNIT_WIDTH + PADDING}px` as `${number}px`,
    // Avoid going under the MiniMap
    top: `${PADDING}px` as `${number}px`,
    right: `${PADDING + MINIMAP_WIDTH}px` as `${number}px`,
  },
};

type FlowProps = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onMapOpen: () => void;
};

export function Flow({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onMapOpen,
}: FlowProps) {
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDragAndDrop();

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer!.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      // Check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Initialize node data based on type
      let data = {};
      if (type === "sourceNode") {
        data = { url: "" };
      }

      const newNode = {
        id: window.crypto.randomUUID(),
        type,
        position,
        data,
        // Create new node center at cursor
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
      proOptions={{ hideAttribution: true }}
      colorMode="light"
      fitViewOptions={fitViewOptions}
      fitView
    >
      <GlassPanel position="top-left">
        <NodesDrawer />
        <Controls fitViewOptions={fitViewOptions} />
      </GlassPanel>
      <Panel position="top-right">
        <ActionButton $variant="red" onClick={onMapOpen}>
          Map
        </ActionButton>
      </Panel>
      <MiniMap />
      <Background gap={16} size={1} />
    </ReactFlow>
  );
}
