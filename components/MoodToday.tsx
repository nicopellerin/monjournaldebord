import * as React from 'react'
import { useState, useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaSun } from 'react-icons/fa'

import { UserContext } from '../context/UserProvider'

export const MoodToday = () => {
  const { updateDailyMoodAction, dailyMood } = useContext(UserContext)

  const [mood, setMood] = useState(dailyMood)

  async function handleSubmit(e) {
    e.preventDefault()
    await updateDailyMoodAction(mood)
  }

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
        <form onSubmit={handleSubmit}>
          <Input
            maxLength={80}
            placeholder="Aujourd'hui, je me sens..."
            name="mood"
            value={mood}
            onChange={e => setMood(e.target.value)}
          />
        </form>
      </Content>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 6rem;
  border-radius: 5px;
`

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  /* padding: 2.5rem 3rem; */
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 50%;
`

const Title = styled.h2`
  font-size: 2.4rem;
  color: ${props => props.theme.colors.textColor};
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 500;
`

const Input = styled.input`
  border: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom: 1px solid #ddd;
  background: whitesmoke;
  padding: 2.5rem 2rem;
  width: 100%;
  font-size: 1.8rem;
  color: ${props => props.theme.colors.textColor};
  font-weight: 500;
`

const Heading = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.inputField};
  border-bottom: 1px solid #eee;
  padding: 2rem 1.8rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-bottom: 1rem;
`
