import * as React from 'react'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import { FaCalendar, FaRegImage, FaUserLock, FaUsers } from 'react-icons/fa'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useMedia } from 'react-use-media'

import { DateNow } from '../DateNow'

import { JournalContext } from '../../context/JournalProvider'

import { maxLength } from '../../utils/maxLength'

type Props = {
  id: string
  title: string
  text: string
  image: string
  createdAt: Date
  mood: string
  status: string
}

export const Card: React.FC<Props> = ({
  id,
  title,
  text,
  image,
  createdAt,
  mood,
  status,
}) => {
  const [showImage, setShowImage] = useState(false)

  const { selectJournal } = useContext(JournalContext)

  const isLaptop = useMedia({
    maxWidth: 1500,
  })

  const titleLength = isLaptop ? 15 : 20
  const textLength = isLaptop ? 140 : 200

  return (
    <Link href={`/journal/[id]`} as={`/journal/${id}`}>
      <AStyled>
        <div style={{ position: 'relative' }}>
          <Wrapper
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
            onClick={() => selectJournal(id)}
          >
            {image && (
              <ImageIcon
                onMouseEnter={() => setShowImage(true)}
                onMouseLeave={() => setShowImage(false)}
              />
            )}
            <Title>{maxLength(title, titleLength)}</Title>
            <Heading>
              <Mood src={mood} alt="Mood" />
              <DateWrapper>
                <CalendarIcon />
                <DateNow dateInfo={createdAt} />
              </DateWrapper>
              <Status isPrivate={status === 'private' ? true : false}>
                {status === 'private' ? <FaUserLock /> : <FaUsers />}
              </Status>
            </Heading>
            <Text>{maxLength(text, textLength)}</Text>
          </Wrapper>
          <AnimatePresence>
            {showImage && <ImageComp image={image} />}
          </AnimatePresence>
        </div>
      </AStyled>
    </Link>
  )
}

const ImageComp = ({ image }) => (
  <ImageCompWrapper
    initial={{ y: 85 }}
    animate={{ y: -85 }}
    exit={{ y: 85 }}
    transition={{ type: 'spring', damping: 70 }}
  >
    <ImageCompImage src={image} alt="" />
  </ImageCompWrapper>
)

// Styles
const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  border-radius: 5px;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px; */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px;
  cursor: pointer;
  height: 100%;
  background: ${props => props.theme.colors.cardBackground};
  position: relative;
  border-top: 5px solid #eef;
  border-bottom: 3px solid #ddd;
  z-index: 20;
`

const Title = styled.h2`
  font-size: 2.6rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.titleColor};
  font-weight: 400;
`

const Text = styled.p`
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

const Status = styled(motion.div)`
  /* position: absolute; */
  top: 1rem;
  right: 1rem;
  background: ${(props: { isPrivate: boolean }) =>
    props.isPrivate ? 'var(--primaryColor)' : 'green'};
  padding: 3px 6px;
  border-radius: 5px;
  color: ghostwhite;
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 18px;
`

const StatusText = styled.span`
  line-height: 1;
`

const ImageCompWrapper = styled(motion.div)`
  position: absolute;
  right: 0px;
  top: -7rem;
  width: 100%;
  z-index: 19;
  background: none;
  padding: 0.5rem;
  border-radius: 5px;
`

const ImageCompImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
`
