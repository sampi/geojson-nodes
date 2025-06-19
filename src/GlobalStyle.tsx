import { createGlobalStyle } from "styled-components";

export const UNIT_WIDTH = 8;

export const GlobalStyle = createGlobalStyle`
  :root {
    --space-unit: ${UNIT_WIDTH}px;
    --color-background: #eceff4;
    --color-foreground: #2e3440;
    --color-border: #4c566a;

    --color-background-glass: rgba(255, 255, 255, 0.2);
    --border-radius-glass: calc(var(--space-unit) * 2);
    --box-shadow-glass: 0 4px 30px rgba(0, 0, 0, 0.1);
    --backdrop-filter-glass: blur(5px);
    --border-glass: 1px solid rgba(255, 255, 255, 0.3);

    --color-background-dark-glass: rgba(150, 150, 150, 0.2);

    --color-red: rgba(235, 21, 16);
    --color-background-red-glass: rgba(235, 21, 16, 0.2);
    --border-red-glass: 1px solid rgba(235, 21, 16, 0.3);
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

    font-family: "Open Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings:
      "wdth" 100;
  }
`;
