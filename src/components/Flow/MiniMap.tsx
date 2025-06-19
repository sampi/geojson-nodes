import styled from "styled-components";
import { MiniMap as FlowMiniMap } from "@xyflow/react";

export const MiniMap = styled(FlowMiniMap)`
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
    rx: var(--border-radius-glass);
    ry: var(--border-radius-glass);
  }
  .react-flow__minimap-mask {
    fill: var(--color-background-dark-glass);
  }
`;
