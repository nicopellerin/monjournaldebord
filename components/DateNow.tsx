import * as React from 'react'
import format from 'date-fns/format'
import styled from 'styled-components'

type Props = {
  dateInfo?: Date | number
}

export const DateNow: React.FC<Props> = ({ dateInfo }) => {
  if (dateInfo) {
    const now = format(dateInfo, 'dd/MM/yyyy')

    return <DateStyled>{now}</DateStyled>
  }

  const todayDate = Date.now()
  const now = format(todayDate, 'dd/MM/yyyy')

  return <DateStyled>{now}</DateStyled>
}

// Styles
const DateStyled = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0;
`
