import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'D-DIN';
    src: url('/fonts/D-DIN/D-DIN.otf');
    font-weight: normal;
  }

  @font-face {
    font-family: 'D-DIN';
    src: url('/fonts/D-DIN/D-DIN-Italic.otf');
    font-style: italic;
  }

  @font-face {
    font-family: 'D-DIN';
    src: url('/fonts/D-DIN/D-DIN-Bold.otf');
    font-weight: bold;
  }

  @font-face {
    font-family: 'NokiaPureHeadline';
    src: url('/fonts/NokiaPureHeadline/NokiaPureHeadline.ttf');
    font-weight: normal;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'D-DIN', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background: ${({ theme }) => (theme as any)?.colors?.background || '#fff'};
    color: ${({ theme }) => (theme as any)?.colors?.foreground || '#000'};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle
