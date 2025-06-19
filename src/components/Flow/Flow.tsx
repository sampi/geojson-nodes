import { useCallback, type DragEvent } from "react";
import {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  useReactFlow,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import styled from "styled-components";

import { useDragAndDrop } from "../../DragAndDropContext";
import { DRAWER_UNIT_WIDTH, NodesDrawer } from "../NodesDrawer/NodesDrawer";
import { UNIT_WIDTH } from "../../GlobalStyle";
import { nodeTypes } from "./nodeTypes";

const PADDING = UNIT_WIDTH * 6;
const MINIMAP_WIDTH = 200;

const fitViewOptions = {
  padding: {
    // @TODO get types from `PaddingWithUnit`
    left: `${UNIT_WIDTH * DRAWER_UNIT_WIDTH + PADDING}px` as `${number}px`,
    right: `${PADDING + MINIMAP_WIDTH}px` as `${number}px`,
  },
};

const StyledControls = styled(Controls)`
  right: 0;
  display: flex;
  margin: var(--space-unit);
  flex-direction: row;
  justify-content: space-between;
  box-shadow: none;

  .react-flow__controls-button {
    width: calc(var(--space-unit) * 4);
    height: calc(var(--space-unit) * 4);
    border-top: var(--border-glass);
    border-bottom: var(--border-glass);
  }

  .react-flow__controls-button:first-child {
    border-radius: var(--space-unit) 0 0 var(--space-unit);
    border-left: var(--border-glass);
  }
  .react-flow__controls-button:nth-child(3) {
    border-radius: 0 var(--space-unit) var(--space-unit) 0;
    border-left: var(--border-glass);
  }

  .react-flow__controls-interactive {
    margin-left: calc(var(--space-unit) * 14);
    border-radius: var(--space-unit);
    border: var(--border-glass);
  }
`;

const StyledMiniMap = styled(MiniMap)`
  bottom: 0;
  background: var(--color-background-glass);
  border-radius: var(--border-radius-glass);
  box-shadow: var(--box-shadow-glass);
  backdrop-filter: var(--backdrop-filter-glass);
  border: var(--border-glass);
  .react-flow__minimap-svg {
    border-radius: var(--space-unit);
  }
  .react-flow__minimap-node {
    border-radius: var(--border-radius-glass);
    rx: var(--border-radius-glass);
    ry: var(--border-radius-glass);
  }
  .react-flow__minimap-mask {
    fill: var(--color-background-dark-glass);
  }
`;

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
      if (type === "sourceNode") {
        data = { url: "" };
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
      proOptions={{ hideAttribution: true }}
      colorMode="light"
      fitViewOptions={fitViewOptions}
      fitView
    >
      <Panel
        position="top-left"
        style={{
          bottom: 0,
          background: "var(--color-background-glass)",
          borderRadius: "var(--border-radius-glass)",
          boxShadow: "var(--box-shadow-glass)",
          backdropFilter: "var(--backdrop-filter-glass)",
          border: "var(--border-glass)",
        }}
      >
        <NodesDrawer />
        <StyledControls fitViewOptions={fitViewOptions} />
      </Panel>
      <Panel position="top-right">
        <button onClick={onMapOpen}>Map</button>
      </Panel>
      <StyledMiniMap />
      <Background gap={16} size={1} />
    </ReactFlow>
  );
}
