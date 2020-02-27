import * as React from "react"
import format from "date-fns/format"
import styled from "styled-components"

export const DateNow = () => {
  const todayDate = Date.now()
  const now = format(todayDate, "dd/MM/yyyy")

  return <DateStyled>{now}</DateStyled>
}

// Styles
const DateStyled = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  /* letter-spacing: 1.1px; */
`
