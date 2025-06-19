import styled, { css } from "styled-components";

export const ActionButton = styled.button<{ $variant?: string }>`
  border-radius: var(--space-unit);
  box-shadow: var(--box-shadow-glass);
  backdrop-filter: var(--backdrop-filter-glass);
  background: var(--color-background-glass);
  border: var(--border-glass);
  padding: var(--space-unit) calc(var(--space-unit) * 3);
  font-size: 1rem;

  ${(props) =>
    props.$variant === "red" &&
    css`
      background: var(--color-background-red-glass);
      border: var(--border-red-glass);
      color: var(--color-red);
    `}
`;
