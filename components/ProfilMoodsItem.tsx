import * as React from 'react'
import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { FaTimesCircle } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import format from 'date-fns/format'

import { MoodsContext } from '../context/MoodsProvider'

interface Props {
  id: string
  mood: string
  createdAt: Date
}

export const ProfilMoodsItem: React.FC<Props> = ({ id, mood, createdAt }) => {
  const [selected, setSelected] = useState(false)

  const { deleteSingleMoodAction } = useContext(MoodsContext)

  const spring = {
    type: 'spring',
    damping: 105,
    stiffness: 100,
  }

  let timeout
  const handleHoverEffect = () => {
    timeout = setTimeout(() => {
      setSelected(true)
    }, 500)
  }

  useEffect(() => {
    return () => clearTimeout(timeout)
  }, [timeout])

  return (
    <ListItem
      positionTransition={spring}
      exit={{}}
      key={id}
      onHoverStart={() => handleHoverEffect()}
      onHoverEnd={() => {
        setSelected(false)
        clearTimeout(timeout)
      }}
    >
      <Hour>{format(createdAt, 'H:mm')}</Hour> {mood}
      <AnimatePresence>
        {selected && (
          <ListItemDeleteIconWrapper
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            initial={{
              y: 21,
              opacity: 0.7,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{}}
            onClick={() => deleteSingleMoodAction(id)}
          >
            <ListItemDeleteIcon />
          </ListItemDeleteIconWrapper>
        )}
      </AnimatePresence>
    </ListItem>
  )
}

// Styles
const ListItem = styled(motion.li)`
  font-size: 1.6rem;
  width: 100%;
  white-space: pre-wrap;
  padding: 2rem 3rem;
  background: white;
  line-height: 1.4em;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #eee;
  }
`

const ListItemDeleteIconWrapper = styled(motion.div)`
  position: absolute;
  right: 2rem;
  top: 38%;
  transform: translateZ(0, -48%, 0);
`

const ListItemDeleteIcon = styled(FaTimesCircle)`
  color: red;
  cursor: pointer;
`

const Hour = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  background: #f4f4f4;
  padding: 2px 5px;
  border-radius: 5px;
  margin-right: 5px;
  color: var(--primaryColor);
`
