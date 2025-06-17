import styled from "styled-components";

const DrawerNodeContainer = styled.article`
  padding: var(--unit);
  margin-bottom: var(--unit);
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Node = () => {
  return (
    <DrawerNodeContainer
      style={{
        backgroundColor: type === "source" ? "var(--nord7)" : "var(--nord10)",
      }}
    >
      {/* Content goes here */}
    </DrawerNodeContainer>
  );
};
