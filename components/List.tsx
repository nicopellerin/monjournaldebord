import React, { useContext } from "react"
import styled from "styled-components"

import { ListItem } from "./ListItem"

import { JournalContext } from "../context/JournalProvider"

export const List: React.FC = () => {
  const { journals } = useContext(JournalContext)

  return (
    <Wrapper>
      {journals.map(item => (
        <ListItem key={item.id} {...item} />
      ))}
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  width: 100%;

  & > div {
    /* margin-bottom: 0.2rem; */
  }
`
