import React, { useContext } from "react"
import styled from "styled-components"

import { Book } from "./Book"
import { JournalSingle } from "./JournalSingle"

import { JournalContext } from "../context/JournalProvider"

export const Content: React.FC = () => {
  const { editing } = useContext(JournalContext)

  return <Wrapper>{editing ? <Book /> : <JournalSingle />}</Wrapper>
}

// Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ghostwhite;
`
