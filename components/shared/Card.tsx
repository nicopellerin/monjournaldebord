import React, { useContext } from 'react'
import styled from 'styled-components'
import { FaCalendar, FaRegImage } from 'react-icons/fa'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMedia } from 'react-use-media'

import { DateNow } from '../DateNow'

import { JournalContext } from '../../context/JournalProvider'

import { maxLength } from '../../utils/maxLength'

type Props = {
  id: string
  title: string
  text: string
  image: string
  createdAt: string
  mood: string
}

export const Card: React.FC<Props> = ({
  id,
  title,
  text,
  image,
  createdAt,
  mood,
}) => {
  const { selectJournal } = useContext(JournalContext)

  const isLaptop = useMedia({
    maxWidth: 1500,
  })

  const titleLength = isLaptop ? 15 : 18
  const textLength = isLaptop ? 140 : 280

  return (
    <Link href={`/journal/[id]`} as={`/journal/${id}`}>
      <AStyled>
        <Wrapper whileHover={{ scale: 1.02 }} onClick={() => selectJournal(id)}>
          {image && <ImageIcon />}

          <Title>{maxLength(title, titleLength)}</Title>
          <Heading>
            <DateWrapper>
              <CalendarIcon />
              <DateNow dateInfo={Date.parse(createdAt)} />
            </DateWrapper>
            <Mood src={mood} alt="Mood" />
          </Heading>
          <Text>{maxLength(text, textLength)}</Text>
        </Wrapper>
      </AStyled>
    </Link>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  padding: 3rem;
  border-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 100%;
  background: ${props => props.theme.colors.cardBackground};
  position: relative;
`

const Title = styled.h2`
  font-size: 3rem;
  color: ${props => props.theme.colors.titleColor};
`

const Text = styled.p`
  font-size: 1.6rem;
  color: ${props => props.theme.colors.textColor};
`

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`

const AStyled = styled.a`
  text-decoration: none;
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const CalendarIcon = styled(FaCalendar)`
  margin-right: 5px;
  color: ${props => props.theme.colors.textColor};
`

const ImageIcon = styled(FaRegImage)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 1.5rem;
  color: #999;
`

const Mood = styled.img`
  width: 20px;
`
