import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { JournalContext } from '../context/JournalProvider'

import { maxLength } from '../utils/maxLength'

const GET_JOURNAL = gql`
  query journal($id: ID!) {
    journal(id: $id) {
      id
      title
      text
      image
      createdAt
    }
  }
`

type Props = {
  title: String
  text: String
  id: String
}

type ItemProps = {
  selected: Boolean
}

export const ListItem: React.FC<Props> = React.memo(({ title, id }) => {
  const { selectJournal } = useContext(JournalContext)

  const {
    query: { id: queryId },
  } = useRouter()

  const selected = queryId === id

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
})

// Styles
const Wrapper = styled(motion.li)`
  text-align: center;
  color: ${props => props.theme.colors.textColor};
  width: 100%;
  padding: 1.1rem 1rem;
  list-style: none;
  background: ${(props: ItemProps) => (props.selected ? '#f9f9f9' : 'none')};
  border-right: ${(props: ItemProps) =>
    props.selected ? '5px solid var(--primaryColor)' : 'none'};

  &:hover {
    background: ${(props: ItemProps) =>
      props.selected ? '#f9f9f9' : '#f8f8f8'};
    cursor: ${(props: ItemProps) => (props.selected ? 'normal' : 'pointer')};
  }
`

const Item = styled(motion.span)`
  display: block;
  font-size: 1.6rem;
  font-weight: ${(props: ItemProps) => (props.selected ? '600' : '400')};
  width: 100%;
`
