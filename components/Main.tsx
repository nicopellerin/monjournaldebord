import * as React from 'react'
import styled from 'styled-components'

import { Sidebar } from './Sidebar'
import { Content } from './Content'

export const Main: React.FC = () => {
  return (
    <>
      <Content />
    </>
  )
}

// // Styles
// const Wrapper = styled.div`
//   display: grid;
//   grid-template-columns: 300px 1fr;
//   height: 100%;
// `
