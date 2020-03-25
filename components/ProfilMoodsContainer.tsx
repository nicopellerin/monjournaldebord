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
import { useRouter } from 'next/router'

import { ProfilMoodsItem } from './ProfilMoodsItem'

interface Props {
  lists: any
  date: string
  index: number
}

interface StylesProps {
  showLess?: boolean
  lessThanFour?: boolean
  journal?: boolean
}

export const ProfilMoodsContainer: React.FC<Props> = ({
  lists,
  date,
  index,
}) => {
  const [showLess, setShowLess] = useState(true)

  const { pathname } = useRouter()

  // const x = useMotionValue(0)
  // const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])

  if (pathname === '/journal/liste') {
    return (
      <AnimatePresence>
        <Wrapper exit={{ opacity: 0 }} key={index}>
          <Title>
            <FaCalendarDay style={{ marginRight: 10 }} />
            {date}
          </Title>
          <List journal>
            {lists.map(listsItem => (
              <AnimatePresence initial={false} key={listsItem.id}>
                <ProfilMoodsItem key={listsItem.id} {...listsItem} />
              </AnimatePresence>
            ))}
          </List>
        </Wrapper>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence initial={false}>
      <Wrapper exit={{ opacity: 0 }} key={index}>
        <Title>
          <FaCalendarDay style={{ marginRight: 10 }} />
          {date}
        </Title>
        <List
          initial={{ height: '29.5rem' }}
          animate={{ height: showLess ? '29.5rem' : 'auto' }}
          exit={{ opacity: 0 }}
          transition={{ damping: 300 }}
          showLess={showLess ? true : false}
          lessThanFour={lists?.length < 5}
        >
          {lists.map(listsItem => (
            <AnimatePresence initial={false} key={listsItem.id}>
              <ProfilMoodsItem key={listsItem.id} {...listsItem} />
            </AnimatePresence>
          ))}
        </List>
        {lists.length > 4 && (
          <ButtonWrapper onClick={() => setShowLess(!showLess)}>
            {showLess ? (
              <>
                <FaPlusCircle
                  size={18}
                  color="#9D00E0"
                  style={{ cursor: 'pointer', marginRight: 5 }}
                />
                Voir liste complète ({lists?.length})
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
const Wrapper = styled(motion.div)`
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  background: ghostwhite;
  border-bottom: 3px solid #ddd;

  &:not(:last-of-type) {
    margin-bottom: 6rem;
  }
`

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  background: ghostwhite;
  padding: 2rem 3rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  color: #440061;
  border-top: 5px solid #eef;

  @media (max-width: 500px) {
    padding: 2rem;
  }
`

const List = styled(motion.ul)`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 50rem;
  position: relative;
  background: none;
  overflow: ${(props: StylesProps) => (props.journal ? 'visible' : 'hidden')};
  margin-bottom: 2rem;
  ${(props: StylesProps) => props.lessThanFour && 'height: auto'}!important;

  &:after {
    content: '';
    background: linear-gradient(
      rgba(248, 248, 255, 0.1),
      rgba(248, 248, 255, 0.8),
      rgba(248, 248, 255, 1)
    );
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    ${(props: StylesProps) => !props.showLess && 'visibility: hidden'}
    ${(props: StylesProps) => props.lessThanFour && 'visibility: hidden'}
  }

  @media (max-width: 500px) {
    width: 35rem;
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
