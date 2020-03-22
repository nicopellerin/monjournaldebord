import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

:root {
  --primaryColor: #9D00E0;
}


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
  font-family: 'Ubuntu', sans-serif;
  color: #555;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


h1, h2, h3, h4, h5 {
  margin-top: 0;
  color: #333;
}
`

export default GlobalStyles
