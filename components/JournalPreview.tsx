import * as React from 'react'
import { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import { FaCalendarAlt, FaUserLock, FaUsers } from 'react-icons/fa'
import { motion } from 'framer-motion'
import dompurify from 'dompurify'

import { DateNow } from './DateNow'

import { JournalContext } from '../context/JournalProvider'

import { dots } from '../utils/imagesBase64'

interface Props {
  title: string
  text: string
  mood: string
  status: string
}

const JournalPreview: React.FC<Props> = ({ title, text, mood, status }) => {
  const { selectedJournal, imageUploaded } = useContext(JournalContext)

  const sanitizer = dompurify.sanitize

  const wrapperRef = useRef(null)

  function convertLinkToHTML(text) {
    const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
    return text?.replace(
      reg,
      `<a href='$1$2' target='_blank' rel='nofollower'>$1$2</a>`
    )
  }

  const convertedText = convertLinkToHTML(sanitizer(text))

  return (
    <Wrapper ref={wrapperRef}>
      <motion.div
        initial={{ y: 10 }}
        animate={{
          y: [10, 0],
        }}
      >
        <Content>
          <Title>{title}</Title>
          <Heading>
            <Mood src={mood} alt="Mood" />
            <DateWrapper>
              <CalendarIcon size={14} />
              <DateNow dateInfo={selectedJournal?.createdAt} />
            </DateWrapper>
            <Status isPrivate={status === 'private' ? true : false}>
              {status === 'private' ? (
                <>
                  <FaUserLock style={{ marginRight: 2 }} />
                  privé
                </>
              ) : (
                <>
                  <FaUsers style={{ marginRight: 2 }} />
                  blogue
                </>
              )}
            </Status>
          </Heading>
          {imageUploaded && <Image src={imageUploaded} alt="" />}
          <Text
            dangerouslySetInnerHTML={{
              __html: convertedText
                ?.replace('\n', '<br/><br/>')
                ?.replace('\n\n', '<br/><br/>'),
            }}
          />
          <DotsWrapper>
            <Dots src={dots} alt="" />
          </DotsWrapper>
        </Content>
      </motion.div>
    </Wrapper>
  )
}

export default JournalPreview

// Styles
const Wrapper = styled.div`
  min-width: 60rem;
  max-width: 80rem;
  height: 100%;
  position: relative;

  @media (max-width: 500px) {
    min-width: unset;
  }
`

const Content = styled(motion.div)``

const Image = styled.img`
  width: 100%;
  height: 42rem;
  margin: 2.2rem 0 0rem;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;

  @media (max-width: 500px) {
    height: 28rem;
    border-radius: 0;
    margin: 2rem 0 0rem;
  }
`

const Title = styled.h2`
  font-size: 6rem;
  word-break: break-all;
  margin-bottom: 2.5rem;
  color: ${(props) => props.theme.colors.titleColor};

  @media (max-width: 500px) {
    padding: 0 2rem;
    line-height: 1.1em;
    font-size: 4.8rem;
  }
`

const Text = styled.p`
  line-height: 1.5em;
  margin-bottom: 3rem;
  margin-top: 3rem;
  color: ${(props) => props.theme.colors.textColor};
  @media (max-width: 500px) {
    padding: 0 2rem;
    margin-top: 3rem;
  }
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 500px) {
    padding: 0 2rem;
  }
`

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid #ddd;
`

const Mood = styled.img`
  width: 28px;

  @media (max-width: 500px) {
    width: 24px;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;

  @media (max-width: 500px) {
    flex-direction: column;
    padding: 0 2rem;
  }
`

const ButtonPDF = styled(motion.button)`
  border: 1px solid #ddd;
  padding: 1em 1.5em;
  background: #fafafa;
  color: #440061;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  width: 200px;
  margin-inline-end: auto;
  font-weight: bold;

  @media (max-width: 767px) {
    width: 200px;
  }

  @media (max-width: 500px) {
    margin: 0;
    margin-bottom: 2rem;
    width: 100%;
  }
`

const ButtonEdit = styled(motion.button)`
  border: 1px solid #ddd;
  padding: 1em 1.5em;
  background: #fafafa;
  color: #333;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-right: 2rem;
  font-weight: bold;

  @media (max-width: 500px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`

const ButtonDelete = styled(motion.button)`
  border: 1px solid #ddd;
  padding: 1em 1.5em;
  background: #fafafa;
  color: red;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-right: 2rem;
  font-weight: bold;

  @media (max-width: 500px) {
    width: 100%;
  }
`

const CalendarIcon = styled(FaCalendarAlt)`
  color: #440061;
  margin-right: 5px;
`

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Dots = styled.img`
  margin: 3rem 0 5rem;
  text-align: center;
`

const Status = styled.span`
  background: ${(props: { isPrivate: boolean }) =>
    props.isPrivate ? 'var(--primaryColor)' : 'green'};
  padding: 4px 6px;
  border-radius: 5px;
  color: ghostwhite;
  font-weight: 600;
  border-bottom: 2px solid #440061;
  display: flex;
  align-items: center;
  line-height: 1;
`
