import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    ${'' /* background-color: #f4f5f7; */}
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    margin: 5%;
    color: #1a1a1a;
    min-height: 200vh;
  }

  .container {
    margin: 0 auto;
    max-width: 768px;
  }

  .text-center {
    text-align: center;
  }

  a {
    color: #666;
  }
`;