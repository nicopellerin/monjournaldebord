import * as React from 'react'
import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSun, FaCheckCircle, FaClock } from 'react-icons/fa'
import format from 'date-fns/format'

import { UserContext } from '../context/UserProvider'

export const MoodToday = () => {
  const { updateDailyMoodAction, moods } = useContext(UserContext)

  const [mood, setMood] = useState('')
  const [saved, setSaved] = useState(false)
  const [dateSaved, setDateSaved] = useState(0)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const dateInit = new Date()
      const dateNow = dateInit.getTime()
      setDateSaved(dateNow)
      await updateDailyMoodAction(mood)
      setSaved(true)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    let id
    if (saved) {
      id = setTimeout(() => {
        setSaved(false), setMood('')
      }, 2000)
    }

    return () => clearTimeout(id)
  }, [saved])

  return (
    <Wrapper>
      <Content
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1],
          y: [10, 0],
        }}
      >
        <Heading>
          <Title>
            <FaSun style={{ marginRight: 7 }} />
            Mood de la journée
          </Title>
        </Heading>
        <Form onSubmit={handleSubmit}>
          <Input
            maxLength={80}
            placeholder="Aujourd'hui, je me sens..."
            name="mood"
            value={mood}
            onChange={e => setMood(e.target.value)}
          />
        </Form>

        <AnimatePresence>
          {saved && (
            <SavedText
              initial={{ x: '-50%', opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, y: [10, -1, 0], scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <FaCheckCircle style={{ marginRight: 5 }} />
              Sauvegardé
            </SavedText>
          )}
        </AnimatePresence>
      </Content>
      <LastMood
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1],
          y: [10, 0],
          transition: {
            delay: 0.2,
          },
        }}
      >
        {moods?.length > 0 && (
          <MoodWrapper>
            <Mood>
              {'« '}
              {moods[0]?.mood}
              {' »'}
            </Mood>
            <MoodDate>
              <FaClock style={{ marginRight: 5 }} />
              {format(
                dateSaved || Number(moods[0]?.createdAt),
                'dd/MM/yyyy - HH:mm'
              )}
            </MoodDate>
          </MoodWrapper>
        )}
      </LastMood>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 6rem;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 6rem;
`

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  position: relative;
`

const Title = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.textColor};
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 500;
`

const Form = styled.form`
  padding: 1.5rem 2rem 1.5rem 2rem;
  background: whitesmoke;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`

const Input = styled.input`
  border: none;
  border-radius: 5px;
  border-bottom: 1px dotted #ddd;
  padding: 1.8rem;
  background: rgba(255, 255, 255, 0.4);
  width: 100%;
  font-size: 1.6rem;
  color: ${props => props.theme.colors.textColor};
  font-weight: 500;

  &::placeholder {
    color: #aaa;
  }
`

const Heading = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.inputField};
  border-bottom: 1px solid #eee;
  padding: 2.5rem 1.8rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-bottom: 1rem;
`

const SavedText = styled(motion.span)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  bottom: -35px;
  color: green;
  font-size: 1.4rem;
`

const LastMood = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Mood = styled.p`
  font-size: 2.2rem;
  text-align: center;
  line-height: 1.5em;
  margin-top: 0;
`

const MoodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MoodDate = styled.span`
  background: ghostwhite;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`
