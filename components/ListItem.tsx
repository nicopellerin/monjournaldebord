import React, { useContext } from "react"
import styled from "styled-components"
import Link from "next/link"

import { JournalContext } from "../context/JournalProvider"

import { maxLength } from "../utils/maxLength"

type Props = {
  title: String
  text: String
  id: Number
}

type ItemProps = {
  selected: Boolean
}

export const ListItem: React.FC<Props> = ({ title, id }) => {
  const { selectJournal, selectedJournal } = useContext(JournalContext)

  return (
    <Link href={`/[id]`} as={`/${id}`}>
      <Wrapper
        selected={selectedJournal?.id === id}
        onClick={() => {
          selectJournal(id)
        }}
      >
        <Item selected={selectedJournal?.id === id}>{maxLength(title)}</Item>
      </Wrapper>
    </Link>
  )
}

// Styles
const Wrapper = styled.ul`
  text-align: center;
  width: 100%;
  padding: 1.1rem 1rem;
  list-style: none;
  background: ${(props: ItemProps) => (props.selected ? "#ddd" : "none")};
  border-right: ${(props: ItemProps) =>
    props.selected ? "5px solid darkviolet" : "none"};

  &:hover {
    /* background: #f8f8f8; */
    cursor: pointer;
  }
`

const Item = styled.li`
  font-size: 1.6rem;
  font-weight: ${(props: ItemProps) => (props.selected ? "600" : "400")};
  width: 100%;
`
