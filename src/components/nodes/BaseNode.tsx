import styled from "styled-components";

const BaseNodeContainer = styled.article`
  background-color: var(--color-background);
  color: var(--color-foreground);
  border-radius: var(--space-unit);
  border: 1px solid var(--color-border);
  padding: var(--space-unit);
  margin-bottom: var(--space-unit);
  text-align: center;
  &:last-child {
    margin-bottom: 0;
  }
`;

const BaseNodeHandle = () => styled.div``;

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
