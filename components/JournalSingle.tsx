import React, { useContext, useEffect } from "react"
import styled from "styled-components"

import { JournalContext } from "../context/JournalProvider"

export const JournalSingle: React.FC = () => {
  const {
    selectJournal,
    selectedJournal,
    journals,
    toggleEditing
  } = useContext(JournalContext)

  useEffect(() => {
    selectJournal(journals[0].id)
  }, [])

  return (
    <Wrapper>
      <Title>{selectedJournal?.title || journals[0].title}</Title>
      <Text>{selectedJournal?.text || journals[0].text}</Text>
      <button onClick={toggleEditing}>Editing</button>
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
`

const Text = styled.p`
  font-size: 1.6rem;
  line-height: 1.5em;
`
