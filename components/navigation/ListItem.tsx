import * as React from 'react'
import { useContext, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { RightMenu } from '../shared/RightMenu'

import { JournalContext } from '../../context/JournalProvider'

import { maxLength } from '../../utils/maxLength'
import { useClickOutside } from '../../hooks/useClickOutside'

interface Props {
  title: string
  text: string
  id: string | string[]
  mood?: string
  layoutId: any
}

interface ItemProps {
  selected: boolean
}

export const ListItem: React.FC<Props> = ({ title, id, layoutId }) => {
  const { selectJournalAction } = useContext(JournalContext)

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
            selectJournalAction(id)
          }}
        >
          <Item animate selected={selected}>
            <Text>{maxLength(title, 23)}</Text>
          </Item>
          {selected && (
            <motion.div
              layoutId={layoutId}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                background: 'var(--primaryColor)',
                height: '100%',
                width: 5,
              }}
            />
          )}
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
const Outer = styled(motion.li)`
  position: relative;
`

const Wrapper = styled(motion.div)`
  color: ${(props) => props.theme.colors.textColor};
  width: 100%;
  padding: 1.5rem 3rem;
  list-style: none;
  background: ${(props: ItemProps) => (props.selected ? '#f4f4f4' : 'none')};
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
  font-size: 1.6rem;
  font-weight: ${(props: ItemProps) => (props.selected ? '600' : '400')};
  width: 100%;
  padding-left: 2rem;
`

const Text = styled.span`
  margin-top: 2px;
  user-select: none;
`
