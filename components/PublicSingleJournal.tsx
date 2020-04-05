import * as React from 'react'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { FaCalendarAlt, FaFilePdf, FaChevronLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import saveAs from 'file-saver'
import dompurify from 'dompurify'
import format from 'date-fns/format'
import { Circle } from 'better-react-spinkit'

import { DateNow } from './DateNow'

import { dots } from '../utils/imagesBase64'

interface Props {
  title: string
  text: string
  image: string
  mood: string
  createdAt: Date
}

const imageVariants = {
  exit: {
    y: 150,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
}

const textVariants = {
  exit: {
    y: 100,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
}

export const PublicSingleJournal: React.FC<Props> = ({
  title,
  text,
  image,
  mood,
  createdAt,
}) => {
  const [exporting, setExporting] = useState(false)

  const sanitizer = dompurify.sanitize

  const wrapperRef = useRef(null)

  const time = new Date(createdAt)

  async function exportToPDF() {
    const body = {
      title,
      text,
      image,
      time,
    }

    setExporting(true)

    try {
      const res = await axios.post('/api/generate-pdf', body, {
        responseType: 'blob',
      })

      const datePDF = format(new Date(), 'yyyy-MM-dd')
      const filename = `monjournaldebord-${datePDF}.pdf`

      saveAs(res.data, filename)
    } catch (err) {
      console.log(err)
    } finally {
      setExporting(false)
    }
  }

  function convertLinkToHTML(text) {
    const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
    return text?.replace(
      reg,
      "<a href='$1$2' target='_blank' rel='nofollower'>$1$2</a>"
    )
  }

  const convertedText = convertLinkToHTML(text)

  return (
    <Wrapper ref={wrapperRef}>
      <Content>
        <Title>{title}</Title>
        <Heading>
          <Mood src={mood} alt="Mood" />
          <DateWrapper>
            <CalendarIcon size={14} />
            <DateNow dateInfo={time} />
          </DateWrapper>
        </Heading>
        {image && <Image variants={imageVariants} src={image} alt="" />}
        <Text
          variants={textVariants}
          dangerouslySetInnerHTML={{
            __html: convertedText
              ?.replace('\n', '<br/><br/>')
              ?.replace('\n\n', '<br/><br/>'),
          }}
        />
        <DotsWrapper>
          <Dots src={dots} alt="" />
        </DotsWrapper>
        <ButtonWrapper>
          <ButtonBack
            onClick={() => Router.router.back()}
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
          >
            <FaChevronLeft style={{ marginRight: 5 }} />
            Retour
          </ButtonBack>
          <ButtonPDF
            disabled={exporting}
            onClick={exportToPDF}
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
          >
            {exporting ? (
              <Circle />
            ) : (
              <>
                <FaFilePdf style={{ marginRight: 5 }} />
                Exporter format PDF
              </>
            )}
          </ButtonPDF>
        </ButtonWrapper>
      </Content>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  min-width: 60rem;
  max-width: 80rem;
  height: 100%;
  position: relative;
  padding: 8rem 0 12rem 0;

  @media (max-width: 500px) {
    min-width: unset;
  }
`

const Content = styled(motion.div)``

const Image = styled(motion.img)`
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

const Text = styled(motion.p)`
  font-size: 1.6rem;
  line-height: 1.5em;
  margin-bottom: 3rem;
  margin-top: 3rem;
  color: ${(props) => props.theme.colors.textColor};
  background: rgba(255, 255, 255, 0.7);

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
  justify-content: space-between;
  margin-top: 2rem;

  @media (max-width: 500px) {
    flex-direction: column;
    padding: 0 2rem;
  }
`

const ButtonBack = styled(motion.button)`
  border: none;
  background: none;
  color: #440061;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;

  @media (max-width: 767px) {
    width: 200px;
  }

  @media (max-width: 500px) {
    margin: 0;
    margin-bottom: 6rem;
    width: 100%;
    padding: 1em 1.5em;
    border: 1px solid #440061;
    border-bottom: 3px solid #440061;
  }
`

const ButtonPDF = styled(motion.button)`
  border: none;
  border-bottom: 3px solid #440061;
  padding: 1em 1.5em;
  background: whitesmoke;
  color: #440061;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  width: 200px;
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
