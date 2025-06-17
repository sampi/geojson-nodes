import styled from "styled-components";
import { useDragAndDrop } from "../../DragAndDropContext";

export const DRAWER_UNIT_WIDTH = 32;

const NodesDrawerContainer = styled.aside`
  width: calc(var(--unit) * ${DRAWER_UNIT_WIDTH});
  background-color: var(--foreground);
  color: var(--background);
  padding: var(--unit);
`;

export const NodesDrawer = () => {
  const [_, setType] = useDragAndDrop();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <NodesDrawerContainer>
      <div className="description">
        You can drag these nodes to the pane on the left.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>
    </NodesDrawerContainer>
  );
};
