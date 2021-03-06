import * as React from 'react'
import { useContext, useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import Router, { useRouter } from 'next/router'

import { FormFormatOne } from './FormFormatOne'
import { ImageContainer } from './ImageContainer'

import { JournalContext } from '../../context/JournalProvider'
import JournalSingle from './JournalSingle'
import JournalPreview from './JournalPreview'

export const Book: React.FC = () => {
  const [loader, setLoader] = useState('')
  const [togglePreview, setTogglePreview] = useState(false)

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [mood, setMood] = useState('')
  const [status, setStatus] = useState('private')
  const [imageName, setImageName] = useState('')

  const { imageUploaded, selectedJournal, newState } = useContext(
    JournalContext
  )

  const {
    query: { id },
  } = useRouter()

  useLayoutEffect(() => {
    if (!selectedJournal && !newState) {
      Router.push(`/journal/[id]`, `/journal/${id}`)
    }
  }, [])

  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <Wrapper
          initial={{ y: -10 }}
          animate={{
            y: [-10, 0],
          }}
          exit={{ y: 50 }}
        >
          <FormWrapper layoutId="container">
            <FormFormatOne
              loader={loader}
              setLoader={setLoader}
              togglePreview={togglePreview}
              setTogglePreview={setTogglePreview}
              title={title}
              setTitle={setTitle}
              text={text}
              setText={setText}
              mood={mood}
              setMood={setMood}
              status={status}
              setStatus={setStatus}
              imageName={imageName}
              setImageName={setImageName}
            />
          </FormWrapper>
          <AnimatePresence>
            {imageUploaded && <ImageContainer setLoader={setLoader} />}
          </AnimatePresence>
        </Wrapper>

        {togglePreview && (
          <>
            <PreviewWrapper>
              <PreviewContainer animate layoutId="container">
                <PreviewInner>
                  <JournalPreview
                    title={title}
                    text={text}
                    mood={mood}
                    status={status}
                  />
                </PreviewInner>
              </PreviewContainer>
            </PreviewWrapper>
            <PreviewOverlay
              onClick={() => setTogglePreview(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
              }}
            />
          </>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  position: relative;
`

const FormWrapper = styled(motion.div)`
  background: #fafafa;
  background-size: cover;
  width: 60rem;
  box-shadow: 0 7px 20px rgba(0, 0, 0, 0.02);
  border-radius: 23px;
  display: flex;
  justify-content: center;
  padding: 5rem 4rem;
  position: relative;
  z-index: 3;
  border-top: 5px solid #eee;
  border-bottom: 3px solid #ddd;

  @media (max-width: 500px) {
    width: 90vw;
    padding: 4rem 2rem;
    margin: 0 auto;
  }
`

const PreviewWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 2001;
  display: grid;
  place-items: center;
`

const PreviewContainer = styled(motion.div)`
  background: ${(props) => props.theme.colors.contentBackground};
  height: 100vh;
  width: 80rem;
  box-shadow: 0 7px 20px rgba(0, 0, 0, 0.1);
`

const PreviewInner = styled.div`
  padding: 6rem 8rem;
  overflow: auto;
  height: 100%;
`

const PreviewOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(7px);
  cursor: pointer;
`
