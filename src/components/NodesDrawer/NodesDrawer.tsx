import type { DragEvent } from "react";
import styled from "styled-components";

import { useDragAndDrop } from "../../contexts/DragAndDrop/useDragAndDrop";
import { BaseNode } from "../nodes/BaseNode";

export const DRAWER_UNIT_WIDTH = 32;

const NodesDrawerContainer = styled.aside`
  width: calc(var(--space-unit) * ${DRAWER_UNIT_WIDTH});
  height: 100%;
  color: var(--color-background);
  padding: var(--space-unit);
`;

export const NodesDrawer = () => {
  const [_, setType] = useDragAndDrop();

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <NodesDrawerContainer>
      <BaseNode
        onDragStart={(event) => onDragStart(event, "sourceNode")}
        draggable
        title="Source Node"
      >
        <input disabled />
      </BaseNode>
      <BaseNode
        onDragStart={(event) => onDragStart(event, "layerNode")}
        draggable
        title="Layer Node"
      ></BaseNode>
      <BaseNode
        onDragStart={(event) => onDragStart(event, "intersectionNode")}
        draggable
        title="Intersection Node"
      >
        not working :(
      </BaseNode>
    </NodesDrawerContainer>
  );
};
