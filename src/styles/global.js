import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    --primaryFontFamily: 'Atkinson Hyperlegible', sans-serif;
    --primaryFontWeight: 700;
    --btn-hover-transition: ease-in-out 0.1s;
    font-family: var(--primaryFontFamily);
    font-weight: var(--primaryFontWeight);
    font-size: 18px;
  }

  html * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1 {
    font-family: var(--primaryFontFamily);
    font-weight: var(--primaryFontWeight);
    font-size: 40px;
  }

  h2 {
    font-family: var(--primaryFontFamily);
    font-weight: var(--primaryFontWeight);
    font-size: 32px;
  }

  h3 {
    font-family: var(--primaryFontFamily);
    font-weight: var(--primaryFontWeight);
    font-size: 20px;
  }

  a {
    text-decoration: none;
  }

  #root {
    width: 100vw;
    height: 100vh;
  }
`;
