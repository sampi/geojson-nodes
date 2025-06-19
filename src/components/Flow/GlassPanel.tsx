import styled from "styled-components";
import { Panel } from "@xyflow/react";

export const GlassPanel = styled(Panel)`
  bottom: 0;
  background: var(--color-background-glass);
  border-radius: var(--border-radius-glass);
  box-shadow: var(--box-shadow-glass);
  backdrop-filter: var(--backdrop-filter-glass);
  border: var(--border-glass);
`;
