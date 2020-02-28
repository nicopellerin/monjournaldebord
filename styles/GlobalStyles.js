import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
*, *:before, *:after {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
  scroll-behavior: auto;

  @media (max-width: 1500px) {
    font-size: 57.5%;
  }
}

#__next {
  height: calc(100vh - 7.5rem);
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Lato', sans-serif;
}


h1, h2, h3, h4, h5 {
  margin-top: 0;
}
`

export default GlobalStyles
