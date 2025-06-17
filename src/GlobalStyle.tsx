import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --unit: 8px;
    --background: #eceff4;
    --foreground: #2e3440;
  }

  * {
    box-sizing: border-box;
  }

  #root {
    position: relative;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: var(--background);
    color: var(--foreground);
    line-height: 1.5;
  }
`;
