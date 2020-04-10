import * as React from 'react'
import { useContext, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { RightMenu } from './RightMenu'

import { JournalContext } from '../context/JournalProvider'

import { maxLength } from '../utils/maxLength'
import { useClickOutside } from '../hooks/useClickOutside'

interface Props {
  title: string
  text: string
  id: string | string[]
  mood?: string
}

interface ItemProps {
  selected: boolean
}

export const ListItem: React.FC<Props> = ({ title, id }) => {
  const { selectJournal } = useContext(JournalContext)

  const {
    query: { id: queryId },
  } = useRouter()

  const selected = queryId === id

  const [rightMenuVisible, setRightMenuVisible] = useState(false)
  const [xVal, setXVal] = useState(0)
  const [yVal, setYVal] = useState(0)

  const ref = useClickOutside(setRightMenuVisible)

  const itemRef = useRef(null)

  function handleRightClick(e) {
    e.preventDefault()
    setRightMenuVisible(true)
    setXVal(e.clientX - itemRef?.current.getBoundingClientRect().left)
    setYVal(e.clientY - itemRef.current.getBoundingClientRect().top)
  }

  useLayoutEffect(() => {
    itemRef.current.addEventListener('contextmenu', handleRightClick)

    return () =>
      itemRef.current.removeEventListener('contextmenu', handleRightClick)
  }, [])

  return (
    <Link href={`/journal/[id]`} as={`/journal/${id}`}>
      <Outer ref={ref}>
        <Wrapper
          ref={itemRef}
          selected={selected}
          onClick={() => {
            setRightMenuVisible(false)
            selectJournal(id)
          }}
        >
          <Item selected={selected}>
            <Text>{maxLength(title, 23)}</Text>
          </Item>
        </Wrapper>
        <AnimatePresence>
          {rightMenuVisible && (
            <RightMenu
              id={id}
              xVal={xVal}
              yVal={yVal}
              setRightMenuVisible={setRightMenuVisible}
            />
          )}
        </AnimatePresence>
      </Outer>
    </Link>
  )
}

// Styles
const Outer = styled.li`
  position: relative;
`

const Wrapper = styled(motion.div)`
  color: ${(props) => props.theme.colors.textColor};
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
  position: relative;
`

const Item = styled(motion.span)`
  display: flex;
  /* justify-content: center; */
  font-size: 1.6rem;
  font-weight: ${(props: ItemProps) => (props.selected ? '600' : '400')};
  width: 100%;
  padding-left: 2rem;
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
  user-select: none;
`
