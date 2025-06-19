import styled from "styled-components";
import { Controls as FlowControls } from "@xyflow/react";

export const Controls = styled(FlowControls)`
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
