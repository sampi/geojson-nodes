import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --space-unit: 8px;
    --color-background: #eceff4;
    --color-foreground: #2e3440;
    --color-border: #4c566a;
  }

  * {
    box-sizing: border-box;
    user-select: none;
  }

  #root {
    position: relative;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: var(--color-background);
    color: var(--color-foreground);
    line-height: 1.5;
  }
`;
