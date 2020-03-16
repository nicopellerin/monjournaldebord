import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { JournalContext } from '../context/JournalProvider'

import { maxLength } from '../utils/maxLength'

interface Props {
  title: string
  text: string
  id: string | string[]
  mood: string
}

interface ItemProps {
  selected: boolean
}

export const ListItem: React.FC<Props> = React.memo(({ title, id, mood }) => {
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
        <Item selected={selected}>
          <Mood src={mood} alt="Mood" />
          <Text>{maxLength(title, 23)}</Text>
        </Item>
      </Link>
    </Wrapper>
  )
})

// Styles
const Wrapper = styled(motion.li)`
  color: ${props => props.theme.colors.textColor};
  width: 100%;
  padding: 1.5rem 3rem;
  list-style: none;
  background: ${(props: ItemProps) => (props.selected ? '#f9f9f9' : 'none')};
  border-right: ${(props: ItemProps) =>
    props.selected ? '5px solid var(--primaryColor)' : 'none'};
  border-bottom: 1px solid #eee;
  &:hover {
    background: ${(props: ItemProps) =>
      props.selected ? '#f9f9f9' : '#f8f8f8'};
    cursor: ${(props: ItemProps) => (props.selected ? 'normal' : 'pointer')};
  }
`

const Item = styled(motion.span)`
  display: flex;
  font-size: 1.6rem;
  font-weight: ${(props: ItemProps) => (props.selected ? '600' : '400')};
  width: 100%;
`

const Mood = styled.img`
  width: 24px;
  margin-right: 10px;
  background: #eee;
  padding: 3px;
  border-radius: 100%;
`

const Text = styled.span`
  margin-top: 2px;
`
