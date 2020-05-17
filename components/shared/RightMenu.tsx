import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaEdit, FaTimes } from 'react-icons/fa'

import { JournalContext } from '../../context/JournalProvider'

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

export const RightMenu: React.FC<RightMenuProps> = ({
  id,
  xVal,
  yVal,
  setRightMenuVisible,
}) => {
  const { selectJournalAction, toggleDeleteAction } = useContext(JournalContext)

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
              selectJournalAction(id)
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
              toggleDeleteAction()
              setRightMenuVisible(false)
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
const RightMenuWrapper = styled(motion.div)`
  position: absolute;
  left: ${(props: RightMenuStyledProps) => props.xVal && props.xVal + 'px'};
  top: ${(props: RightMenuStyledProps) => props.yVal && props.yVal + 'px'};
  z-index: 10;
  background: red;
  padding: 1.5rem 2rem;
  width: 20rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px;
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
