import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
    /* background-color: #fbfbfb; */
  }

  ol, ul, li {
    list-style: none;
  }
`;
