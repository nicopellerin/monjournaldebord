import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { JournalContext } from '../context/JournalProvider'

import { maxLength } from '../utils/maxLength'

type Props = {
  title: String
  text: String
  id: Number
}

type ItemProps = {
  selected: Boolean
}

export const ListItem: React.FC<Props> = ({ title, id }) => {
  const { selectJournal } = useContext(JournalContext)

  const {
    query: { id: queryId },
  } = useRouter()

  const numberId = Number(queryId)

  const selected = numberId === id

  return (
    <Wrapper
      whileHover={{ scale: selected ? 1 : 1.05 }}
      selected={selected}
      onClick={() => {
        selectJournal(id)
      }}
    >
      <Link href={`/journal/[id]`} as={`/journal/${id}`}>
        <Item selected={selected}>{maxLength(title)}</Item>
      </Link>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled(motion.li)`
  text-align: center;
  width: 100%;
  padding: 1.1rem 1rem;
  list-style: none;
  background: ${(props: ItemProps) => (props.selected ? '#f9f9f9' : 'none')};
  border-right: ${(props: ItemProps) =>
    props.selected ? '5px solid var(--primaryColor)' : 'none'};

  &:hover {
    background: ${(props: ItemProps) => (props.selected ? '#eee' : '#f8f8f8')};
    cursor: ${(props: ItemProps) => (props.selected ? 'normal' : 'pointer')};
  }
`

const Item = styled(motion.span)`
  display: block;
  font-size: 1.6rem;
  font-weight: ${(props: ItemProps) => (props.selected ? '600' : '400')};
  width: 100%;
`
