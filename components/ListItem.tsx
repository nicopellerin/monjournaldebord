import * as React from 'react'
import { useContext, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEdit, FaTimes } from 'react-icons/fa'

import { JournalContext } from '../context/JournalProvider'

import { maxLength } from '../utils/maxLength'
import { useClickOutside } from '../hooks/useClickOutside'

interface Props {
  title: string
  text: string
  id: string | string[]
  mood: string
}

interface ItemProps {
  selected: boolean
}

interface RightMenuProps {
  id: string | string[]
  xVal: number
  yVal: number
  setRightMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
}

interface RightMenuStyledProps {
  xVal: number
  yVal: number
}

export const ListItem: React.FC<Props> = React.memo(({ title, id, mood }) => {
  const { selectJournal } = useContext(JournalContext)

  const [rightMenuVisible, setRightMenuVisible] = useState(false)
  const [xVal, setXVal] = useState(0)
  const [yVal, setYVal] = useState(0)

  const ref = useClickOutside(setRightMenuVisible)

  const {
    query: { id: queryId },
  } = useRouter()

  const selected = queryId === id

  const itemRef = useRef(null)

  function handleRightClick(e) {
    e.preventDefault()
    setRightMenuVisible(true)
    setXVal(e.clientX)
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
            <Mood src={mood} alt="Mood" />
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
})

const RightMenu: React.FC<RightMenuProps> = ({
  id,
  xVal,
  yVal,
  setRightMenuVisible,
}) => {
  const [toggleConfirmDelete, setToggleConfirmDelete] = useState(false)

  const { selectJournal, toggleDeleteAction } = useContext(JournalContext)

  return (
    <RightMenuWrapper
      xVal={xVal}
      yVal={yVal}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.1 }}
    >
      <RightMenuList>
        <Link href={`/journal/edit/[id]`} as={`/journal/edit/${id}`}>
          <RightMenuListItem
            onClick={() => {
              selectJournal(id)
              setRightMenuVisible(false)
            }}
          >
            <EditIcon />
            Éditer
          </RightMenuListItem>
        </Link>
        <Link href={`/journal/[id]`} as={`/journal/${id}`}>
          <RightMenuListItem
            onClick={() => {
              setRightMenuVisible(false)
              toggleDeleteAction()
            }}
          >
            <DeleteIcon />
            Supprimer
          </RightMenuListItem>
        </Link>
      </RightMenuList>
    </RightMenuWrapper>
  )
}

// Styles
const Outer = styled.div`
  position: relative;
`

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
  position: relative;
`

const Item = styled(motion.span)`
  display: flex;
  justify-content: center;
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
  user-select: none;
`

const RightMenuWrapper = styled(motion.div)`
  position: absolute;
  left: ${(props: RightMenuStyledProps) => props.xVal && props.xVal + 'px'};
  top: ${(props: RightMenuStyledProps) => props.yVal && props.yVal + 'px'};
  z-index: 10;
  background: red;
  padding: 1.5rem 2rem;
  width: 20rem;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: ghostwhite;
`

const RightMenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  & > :not(:last-child) {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }
`

const RightMenuListItem = styled.li`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    font-weight: 600;
  }
`

const EditIcon = styled(FaEdit)`
  margin-right: 5px;
`

const DeleteIcon = styled(FaTimes)`
  margin-right: 5px;
  color: red;
`
