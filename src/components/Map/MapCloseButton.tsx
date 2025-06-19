import styled from "styled-components";
import { ActionButton } from "../ActionButton/ActionButton";

export const MapCloseButton = styled(ActionButton)`
  position: fixed;
  top: calc(var(--space-unit) * 3);
  right: calc(var(--space-unit) * 3);
  z-index: 10;
`;
