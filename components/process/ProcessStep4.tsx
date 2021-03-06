import * as React from 'react'
import { useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaUpload, FaPaperPlane } from 'react-icons/fa'
import Router from 'next/router'

import { useImageUpload } from '../../hooks/useImageUpload'

import { JournalContext } from '../../context/JournalProvider'

interface Props {
  setJournal: React.Dispatch<React.SetStateAction<object>>
  journal: {
    title: string
    text: string
    mood: string
    image: string
    status: string
  }
  paginate: any
}

export const ProcessStep4 = ({ journal, setJournal, paginate }) => {
  const { handleImageUpload, imageURL, loader } = useImageUpload(false)

  const { addNewJournalAction } = useContext(JournalContext)

  const imageInputRef = useRef(null)

  useEffect(() => {
    if (imageURL) {
      setJournal((prevState) => ({ ...prevState, image: imageURL }))
    }
  }, [imageURL])

  async function handleSubmit(e) {
    e.preventDefault()

    const { title, text, image, mood, status } = journal

    console.log(status)

    try {
      await addNewJournalAction(title, text, image, mood, status)
      Router.push(`/profil`, `/profil`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Wrapper
      animate={{
        y: [-20, 5, 0],
        transition: { delay: 0.1 },
      }}
    >
      <AnimatePresence>
        {imageURL ? (
          <Image
            initial={{ opacity: 0 }}
            animate={{
              y: [-20, 5, 0],
              opacity: [0, 1],
              transition: { delay: 0.1 },
            }}
            exit={{ opacity: 0 }}
            src={imageURL}
            alt=""
          />
        ) : (
          <>
            <Title exit={{ opacity: 0 }}>
              {'Optionnel, mais tu peux aussi ajouter une image :)'}
            </Title>
          </>
        )}
      </AnimatePresence>
      <InputWrapper>
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageUpload}
          accept="image/png, image/jpeg"
          hidden
        />
        <ButtonUpload
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => imageInputRef.current.click()}
        >
          <FaUpload style={{ marginRight: 7 }} />
          {!loader ? 'Choisir image...' : loader}
        </ButtonUpload>
      </InputWrapper>
      <ButtonWrapper>
        <ButtonPrev
          onClick={() => paginate(-1)}
          whileHover={{ y: -1 }}
          whileTap={{ y: 1 }}
        >
          <FaArrowLeft style={{ marginRight: 5 }} />
          Précedent
        </ButtonPrev>
        <ButtonNext
          onClick={handleSubmit}
          whileHover={{ y: -1 }}
          whileTap={{ y: 1 }}
        >
          <FaPaperPlane style={{ marginRight: 8 }} />
          Publier
        </ButtonNext>
      </ButtonWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100%;
`

const Title = styled(motion.h1)`
  font-size: 6rem;
  margin-bottom: 5rem;
  font-family: var(--systemFont);
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4rem;
  width: 30vw;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`

const ButtonNext = styled(motion.button)`
  border: 2px solid var(--primaryColor);
  padding: 1.1em 2.2em;
  background: none;
  color: var(--primaryColor);
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: bold;
`

const ButtonPrev = styled(motion.button)`
  border: none;
  padding: 1.1em 2.2em;
  background: ghostwhite;
  color: #333;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.6rem;
  margin-right: 2rem;
  font-weight: bold;
`

const ButtonUpload = styled(motion.button)`
  border: 1px solid #ddd;
  padding: 1.1em 1.5em;
  color: #666;
  background: white;
  /* text-transform: uppercase; */
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  width: 27rem;
  margin-top: 0.7rem;
  font-weight: bold;
`

const Image = styled(motion.img)`
  width: 100%;
  height: 42rem;
  margin-bottom: 4rem;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
`
