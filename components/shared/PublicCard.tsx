import * as React from 'react'
import styled from 'styled-components'
import { FaCalendar, FaRegImage, FaUserLock, FaUsers } from 'react-icons/fa'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useMedia } from 'react-use-media'

import { DateNow } from '../DateNow'

import { maxLength } from '../../utils/maxLength'

type Props = {
  id: string
  title: string
  text: string
  image: string
  createdAt: Date
  mood: string
  username: string | string[]
}

export const PublicCard: React.FC<Props> = ({
  id,
  title,
  text,
  image,
  createdAt,
  mood,
  username,
}) => {
  const isLaptop = useMedia({
    minWidth: 1200,
  })

  const titleLength = isLaptop ? 50 : 15
  const textLength = isLaptop ? 500 : 140

  const journal = { id, title, text, image, createdAt, mood, username } as any

  return (
    <Link
      href={{ pathname: `/public/[username]/[id]`, query: journal }}
      as={`/public/${username}/${id}`}
    >
      <AStyled>
        <motion.div style={{ position: 'relative' }}>
          <Wrapper
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
            onClick={() => {}}
          >
            <Title>{maxLength(title, titleLength)}</Title>
            <Heading>
              <Mood src={mood} alt="Mood" />
              <DateWrapper>
                <CalendarIcon />
                <DateNow dateInfo={createdAt} />
              </DateWrapper>
            </Heading>
            {image && <ImageStyled src={image} alt="" />}
            <Text>{maxLength(text, textLength)}</Text>
            {text.length > textLength && (
              <ButtonReadMore>Lire la suite...</ButtonReadMore>
            )}
          </Wrapper>
        </motion.div>
      </AStyled>
    </Link>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px;
  cursor: pointer;
  height: 100%;
  width: 60rem;
  background: ${props => props.theme.colors.cardBackground};
  position: relative;
  border-top: 5px solid #eef;
  border-bottom: 3px solid #ddd;
  z-index: 20;
  margin-bottom: 8rem;

  &:not(:last-of-type) {
  }
`

const Title = styled.h2`
  font-size: 3.6rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.titleColor};
  /* font-weight: 400; */
  word-wrap: break-word;
`

const Text = styled(motion.p)`
  font-size: 1.6rem;
  color: ${props => props.theme.colors.textColor};
  word-wrap: break-word;
  line-height: 1.4em;
  margin-bottom: 0;
`

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid #ddd;
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
  color: #440061;
`

const Mood = styled.img`
  width: 20px;
`

const ImageStyled = styled(motion.img)`
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 2rem;
`

const ButtonReadMore = styled(motion.button)`
  border: 1px solid var(--primaryColor);
  border-bottom: 3px solid var(--primaryColor);
  padding: 1em 2em;
  background: ghostwhite;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
  color: var(--primaryColor);
  width: 100%;
  font-weight: bold;
  margin-top: 3rem;
`
