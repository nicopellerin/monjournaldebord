import * as React from 'react'
import { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  FaCalendarAlt,
  FaEdit,
  FaTimes,
  FaFilePdf,
  FaUserLock,
  FaUsers,
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import saveAs from 'file-saver'
import dompurify from 'dompurify'

import { DateNow } from './DateNow'
import { ToggleDeleteModal } from './ToggleDeleteModal'

import { JournalContext } from '../context/JournalProvider'
import format from 'date-fns/format'

const JournalSingle: React.FC = () => {
  const {
    selectJournal,
    selectedJournal,
    journalsLoading,
    journals,
    toggleEditing,
    toggleDelete,
    toggleDeleteAction,
  } = useContext(JournalContext)

  const sanitizer = dompurify.sanitize

  useEffect(() => {
    if (!journals.length && !journalsLoading) {
      Router.push('/profil', '/profil')
    }
  }, [journals])

  const wrapperRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    console.log(wrapperRef.current.offsetTop)
    console.log('yo')
  }, [Router.router.pathname])

  useEffect(() => {
    const currentIdx = journals?.findIndex(
      journal => journal.id === selectedJournal?.id
    )
    const prevIdx = journals[currentIdx - 1]
    const nextIdx = journals[currentIdx + 1]

    const prevPublication = e => {
      if (prevIdx && e.keyCode === 37) {
        Router.push(`/journal/[id]`, `/journal/${prevIdx.id}`, {
          shallow: true,
        })
        selectJournal(prevIdx.id)
      }
    }
    document.addEventListener('keydown', prevPublication)

    const nextPublication = e => {
      if (currentIdx + 1 < 6 && e.keyCode === 39) {
        Router.push(`/journal/[id]`, `/journal/${nextIdx.id}`, {
          shallow: true,
        })
        selectJournal(nextIdx.id)
      }
    }

    document.addEventListener('keydown', nextPublication)

    return () => {
      document.removeEventListener('keydown', prevPublication)
      document.removeEventListener('keydown', nextPublication)
    }
  }, [selectedJournal])

  async function exportToPDF() {
    const data = {
      title: selectedJournal?.title,
      text: selectedJournal?.text,
      image: selectedJournal?.image,
      mood: selectedJournal?.mood,
      createdAt: selectedJournal?.createdAt,
    }

    const res = await axios.post(
      '/api/save-pdf',
      { data },
      {
        responseType: 'arraybuffer',
      }
    )

    const datePDF = format(new Date(), 'yyyy-MM-dd')
    const filename = `monjournaldebord-${datePDF}.pdf`

    const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

    saveAs(pdfBlob, filename)
  }

  function convertLinkToHTML(text) {
    const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
    return text.replace(
      reg,
      "<a href='$1$2' target='_blank' rel='nofollower'>$1$2</a>"
    )
  }

  const convertedText = convertLinkToHTML(sanitizer(selectedJournal?.text))

  return (
    <Wrapper ref={wrapperRef}>
      <motion.div
        initial={{
          scale: 0.96,
          y: 10,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
        }}
        exit={{
          scale: 0.6,
          y: 100,
          opacity: 0,
          transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
        }}
      >
        <Content
          animate={{
            opacity: toggleDelete ? 0.3 : 1,
            transition: { duration: 0.2 },
          }}
          disabled={toggleDelete}
        >
          <Title>{selectedJournal?.title}</Title>
          <Heading>
            <Mood src={selectedJournal?.mood} alt="Mood" />
            <DateWrapper>
              <CalendarIcon size={14} />
              <DateNow dateInfo={selectedJournal?.createdAt} />
            </DateWrapper>
            <Status>
              {selectedJournal?.status === 'private' ? (
                <>
                  <FaUserLock style={{ marginRight: 2 }} />
                  privé
                </>
              ) : (
                <>
                  <FaUsers style={{ marginRight: 2 }} />
                  public
                </>
              )}
            </Status>
          </Heading>
          {selectedJournal?.image && (
            <Image src={selectedJournal?.image} alt="" />
          )}
          <Text
            dangerouslySetInnerHTML={{
              __html: convertedText
                .replace('\n', '<br/><br/>')
                .replace('\n\n', '<br/><br/>'),
            }}
          />
          <Dots>&#8411;</Dots>
          <ButtonWrapper>
            <ButtonPDF
              onClick={exportToPDF}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFilePdf style={{ marginRight: 5 }} />
              Exporter format PDF
            </ButtonPDF>
            <Link
              href={`/journal/edit/[id]`}
              as={`/journal/edit/${selectedJournal?.id}`}
            >
              <ButtonEdit
                onClick={() => toggleEditing(selectedJournal?.image)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEdit style={{ marginRight: 5 }} />
                Éditer
              </ButtonEdit>
            </Link>
            <ButtonDelete
              onClick={toggleDeleteAction}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaTimes style={{ marginRight: 5 }} />
              Supprimer
            </ButtonDelete>
          </ButtonWrapper>
        </Content>
      </motion.div>

      {toggleDelete && (
        <ToggleDeleteModal
          setToggleDelete={toggleDeleteAction}
          journalTitle={selectedJournal?.title}
        />
      )}
    </Wrapper>
  )
}

export default JournalSingle

// Styles
const Wrapper = styled.div`
  min-width: 60rem;
  max-width: 80rem;
  height: 100%;
  /* padding: 9rem 0 12rem 0; */
  position: relative;

  @media (max-width: 500px) {
    min-width: unset;
    /* padding: 6rem 0 9rem 0; */
  }
`

const Content = styled(motion.div)`
  ${(props: { disabled: boolean }) => props.disabled && `pointer-events: none`};
`

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
  color: ${props => props.theme.colors.titleColor};

  @media (max-width: 500px) {
    padding: 0 2rem;
    line-height: 1.1em;
    font-size: 4.8rem;
  }
`

const Text = styled.p`
  font-size: 1.6rem;
  line-height: 1.5em;
  margin-bottom: 3rem;
  margin-top: 3rem;
  color: ${props => props.theme.colors.textColor};

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
    /* line-height: 1em; */
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
  margin-top: 2rem;

  @media (max-width: 500px) {
    flex-direction: column;
    padding: 0 2rem;
  }
`

const ButtonPDF = styled(motion.button)`
  border: none;
  border-bottom: 3px solid #440061;
  padding: 1em 1.5em;
  background: whitesmoke;
  color: #440061;
  /* text-transform: uppercase; */
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-inline-end: auto;

  @media (max-width: 500px) {
    margin: 0;
    margin-bottom: 2rem;
  }
`

const ButtonEdit = styled(motion.button)`
  border: none;
  border-bottom: 3px solid #333;
  padding: 1em 1.5em;
  background: whitesmoke;
  color: #333;
  /* text-transform: uppercase; */
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-right: 2rem;

  @media (max-width: 500px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`

const ButtonDelete = styled(motion.button)`
  border: none;
  border-bottom: 3px solid red;
  padding: 1em 1.5em;
  background: whitesmoke;
  color: red;
  /* text-transform: uppercase; */
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-right: 2rem;

  @media (max-width: 500px) {
    width: 100%;
  }
`

const CalendarIcon = styled(FaCalendarAlt)`
  color: #440061;
  margin-right: 5px;
`

const Dots = styled.span`
  display: block;
  font-size: 5rem;
  text-align: center;
  margin-left: 20px;
`

const Status = styled.span`
  background: var(--primaryColor);
  padding: 4px 6px;
  border-radius: 5px;
  color: ghostwhite;
  font-weight: 600;
  border-bottom: 2px solid #440061;
  display: flex;
  align-items: center;
  line-height: 1;
`
