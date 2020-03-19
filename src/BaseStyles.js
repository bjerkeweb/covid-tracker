import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: #fcfcfc;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    margin: 5%;
    ${'' /* color: #2a2a2a; */}
  }

  .container {
    margin: 0 auto;
    max-width: 768px;
    ${'' /* padding: 0 8%; */}
  }

  .text-center {
    text-align: center;
  }

  a {
    color: #666;
  }
`;