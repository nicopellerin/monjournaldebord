import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { FaCalendar } from "react-icons/fa"

import { DateNow } from "./DateNow"

import { JournalContext } from "../context/JournalProvider"

export const JournalSingle: React.FC = () => {
  const {
    selectJournal,
    selectedJournal,
    journals,
    toggleEditing
  } = useContext(JournalContext)

  return (
    <Wrapper>
      <Title>{selectedJournal?.title || journals[0].title}</Title>
      <DateWrapper>
        <FaCalendar style={{ marginRight: 8 }} />
        <DateNow />
      </DateWrapper>
      <Text>{selectedJournal?.text || journals[0].text}</Text>
      <ButtonWrapper>
        <button onClick={toggleEditing}>Editing</button>
      </ButtonWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  max-width: 80rem;
`

const Title = styled.h2`
  font-size: 6rem;
  word-break: break-all;
  margin-bottom: 3rem;
`

const Text = styled.p`
  font-size: 1.6rem;
  line-height: 1.5em;
  margin-bottom: 3rem;
`

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
