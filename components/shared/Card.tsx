import React, { useContext } from 'react'
import styled from 'styled-components'
import { FaCalendar } from 'react-icons/fa'
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
  createdAt: string
}

export const Card: React.FC<Props> = ({ id, title, text, createdAt }) => {
  const { selectJournal } = useContext(JournalContext)

  const isLaptop = useMedia({
    maxWidth: 1500,
  })

  const titleLength = isLaptop ? 15 : 18
  const textLength = isLaptop ? 140 : 280

  return (
    <Wrapper whileHover={{ scale: 1.02 }} onClick={() => selectJournal(id)}>
      <Link href={`/journal/[id]`} as={`/journal/${id}`}>
        <AStyled>
          <Title>{maxLength(title, titleLength)}</Title>
          <DateWrapper>
            <FaCalendar style={{ marginRight: 5 }} />
            <DateNow dateInfo={Date.parse(createdAt)} />
          </DateWrapper>
          <Text>{maxLength(text, textLength)}</Text>
        </AStyled>
      </Link>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  padding: 3rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 100%;
  background: ghostwhite;
`

const Title = styled.h2`
  font-size: 3rem;
`

const Text = styled.p`
  font-size: 1.4rem;
`

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
`

const AStyled = styled.a`
  text-decoration: none;
`
