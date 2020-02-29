import React, { useContext } from "react"
import styled from "styled-components"

import { Card } from "./Card"

import { JournalContext } from "../../context/JournalProvider"

export const CardList: React.FC = () => {
  const { journals } = useContext(JournalContext)

  return (
    <Wrapper>
      <ListWrapper>
        {journals.map(journal => (
          <Card key={journal.id} {...journal} />
        ))}
      </ListWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  padding: 3rem;
`

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-gap: 3rem;
`
