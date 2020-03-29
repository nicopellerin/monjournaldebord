import * as React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaRegSmile,
  FaCheckCircle,
  FaRegClock,
  FaPaperPlane,
} from 'react-icons/fa'
import format from 'date-fns/format'
import { fr } from 'date-fns/locale'

import { MoodsContext } from '../context/MoodsProvider'
import { useMedia } from 'react-use-media'

export const MoodToday = () => {
  const { updateDailyMoodAction, moods } = useContext(MoodsContext)

  const [mood, setMood] = useState('')
  const [saved, setSaved] = useState(false)
  const [showSaveIcon, setShowSaveIcon] = useState(false)

  const isDesktop = useMedia({
    minWidth: 769,
  })

  const inputRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!mood.length) return

    try {
      await updateDailyMoodAction(mood)
      setShowSaveIcon(false)
      setSaved(true)
      inputRef.current.blur()
      setMood('')
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    let id
    if (saved) {
      id = setTimeout(() => {
        setSaved(false)
      }, 2000)
    }

    return () => clearTimeout(id)
  }, [saved])

  return (
    <Wrapper>
      <div style={{ position: 'relative' }}>
        <Content
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1],
            y: [10, 0],
          }}
        >
          <Heading>
            <Title>
              <FaRegSmile style={{ marginRight: 7 }} />
              Mood de la journée
            </Title>
          </Heading>
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Input
              aria-label="mood"
              id="mood"
              ref={inputRef}
              maxLength={80}
              placeholder="Aujourd'hui, je me sens..."
              name="mood"
              value={mood}
              onChange={e => {
                setMood(e.target.value)
                e.target.value.length > 0
                  ? setShowSaveIcon(true)
                  : setShowSaveIcon(false)
              }}
            />
          </Form>

          <AnimatePresence>
            {saved && (
              <SavedText
                initial={{ x: '-50%', y: 0 }}
                animate={{ y: 35 }}
                exit={{ y: 0 }}
                transition={{ damping: 200, delay: 0.5 }}
              >
                <FaCheckCircle style={{ marginRight: 5 }} />
                Sauvegardé
              </SavedText>
            )}
          </AnimatePresence>
        </Content>
        <AnimatePresence>
          {showSaveIcon && (
            <ButtonWrapper
              initial={{ y: '-20%', x: '-50%', position: 'absolute' }}
              animate={{ y: '98%' }}
              exit={{ y: '-20%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            >
              <ButtonSave
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Publier
                <FaPaperPlane style={{ marginLeft: 5 }} />
              </ButtonSave>
            </ButtonWrapper>
          )}
        </AnimatePresence>
      </div>
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
              <span style={{ color: '#440061', fontWeight: 'bold' }}>
                {'« '}
              </span>
              {moods[0]?.mood}
              <span style={{ color: '#440061', fontWeight: 'bold' }}>
                {' »'}
              </span>
            </Mood>
            <MoodDate>
              <FaRegClock style={{ marginRight: 5 }} />
              {format(moods[0]?.createdAt, 'iiii dd MMMM - HH:mm', {
                locale: fr,
              })}
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
  margin-bottom: 8rem;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 6rem;
  padding-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 6rem;
    grid-template-columns: 1fr;
    padding: 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 6rem;
  }
`

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px;
  border-radius: 5px;
  position: relative;
  border-top: 5px solid #eef;
  border-bottom: 3px solid #ddd;
  z-index: 2;
`

const Title = styled.h2`
  font-size: 1.8rem;
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
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 1.5rem 1rem;
  }
`

const Input = styled.input`
  border: none;
  border-radius: 5px;
  border-bottom: 1px dotted #ddd;
  padding: 1.6rem;
  background: rgba(255, 255, 255, 0.4);
  width: 100%;
  font-size: 1.6rem;
  color: ${props => props.theme.colors.textColor};
  font-weight: 400;
  font-family: inherit;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 500px) {
    padding: 1.6rem 1rem;
  }
`

const ButtonWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom: 3px solid #ddd;
  width: 100%;
  left: 0;
  background: ghostwhite;
  display: flex;
  justify-content: center;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px;
  width: 25rem;
  left: 50%;
`

const ButtonSave = styled(motion.button)`
  padding: 1.2rem;
  background: var(--primaryColor);
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  bottom: 0px;
  border: none;
  border-bottom: 3px solid #440061;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  cursor: pointer;
`

const Heading = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.inputField};
  border-bottom: 1px solid #eee;
  padding: 2.5rem 1.8rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-bottom: 1rem;

  @media (max-width: 500px) {
    padding: 2.2rem 1.8rem;
  }
`

const SavedText = styled(motion.span)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  bottom: 0px;
  color: green;
  font-size: 1.4rem;
  padding: 1rem;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 4px 0px 15px rgba(0, 0, 0, 0.1);
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

  @media (max-width: 500px) {
    font-size: 1.8rem;
  }
`

const MoodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MoodDate = styled.span`
  background: ghostwhite;
  color: #440061;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #eef;
  border-bottom: 2px solid #eee;
`
