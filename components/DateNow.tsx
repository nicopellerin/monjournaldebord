import * as React from 'react'
import format from 'date-fns/format'
import { fr } from 'date-fns/locale'
import styled from 'styled-components'

type Props = {
  dateInfo?: Date
}

export const DateNow: React.FC<Props> = ({ dateInfo }) => {
  const now = dateInfo
    ? format(dateInfo, 'iiii dd MMMM yyyy', { locale: fr })
    : 0

  return <DateStyled>{now}</DateStyled>
}

// Styles
const DateStyled = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0;
  color: #440061;
`
