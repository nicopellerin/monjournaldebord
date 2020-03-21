import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { FaPlusCircle, FaCalendarDay, FaTimesCircle } from 'react-icons/fa'

import { ProfilMoodsItem } from './ProfilMoodsItem'

interface Props {
  moods: any
  date: string
  key: number
}

interface StylesProps {
  showLess: boolean
  lessThanFour: boolean
}

export const ProfilMoodsContainer: React.FC<Props> = ({
  moods,
  date,
  key: i,
}) => {
  const [showLess, setShowLess] = useState(true)

  const x = useMotionValue(0)
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])

  return (
    <AnimatePresence>
      <Wrapper
        style={{ x, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        exit={{ opacity: 0 }}
        key={i}
      >
        <Title>
          <FaCalendarDay style={{ marginRight: 10 }} />
          {date}
        </Title>
        <List
          animate={{ height: showLess ? '29rem' : 'auto' }}
          exit={{ opacity: 0 }}
          transition={{ damping: 300 }}
          showLess={showLess ? true : false}
          lessThanFour={moods?.length < 5}
        >
          {moods.map(moodItem => (
            <AnimatePresence initial={false}>
              <ProfilMoodsItem key={moodItem.id} {...moodItem} />
            </AnimatePresence>
          ))}
        </List>
        {moods.length > 4 && (
          <ButtonWrapper onClick={() => setShowLess(!showLess)}>
            {showLess ? (
              <>
                <FaPlusCircle
                  size={18}
                  color="#9D00E0"
                  style={{ cursor: 'pointer', marginRight: 5 }}
                />
                Voir liste complète ({moods?.length})
              </>
            ) : (
              <>
                <FaTimesCircle
                  size={18}
                  color="#9D00E0"
                  style={{ cursor: 'pointer', marginRight: 5 }}
                />
                Fermer
              </>
            )}
          </ButtonWrapper>
        )}
      </Wrapper>
    </AnimatePresence>
  )
}

// Styles
const Title = styled.h3`
  font-size: 2rem;
  background: ghostwhite;
  padding: 2rem 3rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  cursor: move;
`

const Wrapper = styled(motion.div)`
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  background: ghostwhite;

  &:not(:last-of-type) {
    margin-bottom: 6rem;
  }
`

const List = styled(motion.ul)`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 50rem;
  overflow: hidden;
  position: relative;
  background: none;
  margin-bottom: 2rem;
  ${(props: StylesProps) => props.lessThanFour && 'height: auto'}!important;

  &:after {
    content: '';
    background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 1)
    );
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    ${(props: StylesProps) => !props.showLess && 'visibility: hidden'}
    ${(props: StylesProps) => props.lessThanFour && 'visibility: hidden'}
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 2rem;
  background: ghostwhite;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primaryColor);
  cursor: pointer;
`
