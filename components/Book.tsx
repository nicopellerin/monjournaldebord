import * as React from "react"
import styled from "styled-components"

import { FormFormatOne } from "./FormFormatOne"

export const Book: React.FC = () => {
  return (
    <Wrapper>
      <FormFormatOne />
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  background: lightyellow;
  width: 60rem;
  min-height: 70vh;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 23px;
  display: flex;
  justify-content: center;
  padding: 4rem;
`
