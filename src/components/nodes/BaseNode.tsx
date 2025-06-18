import styled from "styled-components";

const BaseNodeContainer = styled.article`
  background-color: var(--color-background);
  color: var(--color-foreground);
  border-radius: var(--space-unit);
  box-shadow: var(--box-shadow-glass);
  border: var(--border-glass);
  padding: var(--space-unit);
  margin-bottom: var(--space-unit);
  text-align: center;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const BaseNode: React.FC<
  React.PropsWithChildren<
    { title: string } & React.HTMLAttributes<HTMLDivElement>
  >
> = ({ title, children, ...htmlProps }) => (
  <BaseNodeContainer {...htmlProps}>
    <header>
      <h2>{title}</h2>
    </header>
    {children}
  </BaseNodeContainer>
);
