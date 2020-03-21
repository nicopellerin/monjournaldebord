import * as React from 'react'
import { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import { fr } from 'date-fns/locale'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlusCircle, FaCalendarDay, FaTimesCircle } from 'react-icons/fa'

import { MoodsContext } from '../context/MoodsProvider'

interface StylesProps {
  showLess: boolean
  lessThanFour: boolean
}

export const ProfilMoods = React.memo(() => {
  const { moods } = useContext(MoodsContext)
  const [showLess, setShowLess] = useState(true)
  const [showDeleteIcon, setshowDeleteIcon] = useState(null)

  const moodsByDate = useMemo(
    () =>
      moods?.reduce((dates, cur) => {
        const date = format(Number(cur.createdAt), 'iiii dd MMMM', {
          locale: fr,
        })
        dates[date] = dates[date] || []
        dates[date].push({ id: cur.id, mood: cur.mood })
        return dates
      }, {}),
    [moods]
  )

  return (
    <Wrapper>
      <Content animate={{ y: [10, 0], opacity: [0, 1] }}>
        {Object.entries(moodsByDate).map(
          ([date, moods]: [string, [{ id: string; mood: string }]], i) => {
            return (
              <DateGroup key={i}>
                <Title>
                  <FaCalendarDay style={{ marginRight: 10 }} />
                  {date}
                </Title>
                <AnimatePresence initial={false}>
                  <List
                    animate={{ height: showLess ? '29rem' : 'auto' }}
                    exit={{ opacity: 0 }}
                    transition={{ damping: 300 }}
                    showLess={showLess ? true : false}
                    lessThanFour={moods?.length < 5}
                  >
                    {moods.map(moodItem => (
                      <ListItem
                        layoutTransition
                        key={moodItem.id}
                        onMouseOver={() => setshowDeleteIcon(moodItem.id)}
                        onMouseLeave={() => setshowDeleteIcon(null)}
                      >
                        {moodItem?.mood}
                        <AnimatePresence>
                          {showDeleteIcon === moodItem.id && (
                            <motion.div
                              style={{
                                position: 'absolute',
                                right: '2rem',
                                top: '38%',
                                transform: 'translateZ(0,-48%, 0)',
                              }}
                              initial={{
                                y: 21,
                                opacity: 0.7,
                              }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{}}
                            >
                              <ListItemDeleteIcon />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </ListItem>
                    ))}
                  </List>
                </AnimatePresence>
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
              </DateGroup>
            )
          }
        )}
      </Content>
    </Wrapper>
  )
})

// Styles
const Wrapper = styled.div`
  padding: 8rem;
  background: ${props => props.theme.colors.background};
  transition: background 100ms ease-in-out;
  min-height: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 1500px) {
    padding: 10em 9rem;
  }
`

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50rem;
`

const Title = styled.h3`
  font-size: 2rem;
  background: ghostwhite;
  padding: 2rem 3rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
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
    ${(props: StylesProps) => !props.showLess && 'opacity: 0'}
    ${(props: StylesProps) => props.lessThanFour && 'opacity: 0'}
  }
`

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

const ListItemDeleteIcon = styled(FaTimesCircle)`
  color: red;
  cursor: pointer;
`

const DateGroup = styled.div`
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  background: ghostwhite;

  &:not(:last-of-type) {
    margin-bottom: 6rem;
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