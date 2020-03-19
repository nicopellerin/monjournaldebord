import * as React from 'react'
import { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  FaCheckCircle,
  FaTimes,
  FaCalendarAlt,
  FaUpload,
  FaExclamationCircle,
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import axios from 'axios'
import Router, { useRouter } from 'next/router'

import { DateNow } from './DateNow'

import { JournalContext } from '../context/JournalProvider'
import { FormEmoticons } from './FormEmoticons'

export const emoticons = [
  { id: 1, type: 'Joyeux(se)', path: '/emotions/happy.png' },
  { id: 2, type: 'Fou/folle', path: '/emotions/crazy.png' },
  { id: 3, type: 'En amour', path: '/emotions/love.png' },
  { id: 4, type: 'Aux anges', path: '/emotions/angel.png' },
  { id: 5, type: 'Triste', path: '/emotions/sad.png' },
  { id: 6, type: 'Malade', path: '/emotions/sick.png' },
  { id: 7, type: 'Fatigué(e)', path: '/emotions/sleepy.png' },
  { id: 8, type: 'Fâché(e)', path: '/emotions/angry.png' },
]

type Props = {
  loader: string
  setLoader: any
}

export const FormFormatOne: React.FC<Props> = ({ loader, setLoader }) => {
  const {
    selectedJournal,
    editSelectedJournal,
    addNewJournal,
    selectJournal,
    newState,
    undoNewJournal,
    journals,
    uploadImage,
    imageUploaded,
  } = useContext(JournalContext)

  const {
    query: { id },
  } = useRouter()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [mood, setMood] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageError, setImageError] = useState('')
  const [formErrors, setFormErrors] = useState([])

  const imageInputRef = useRef(null)

  const titleValue = newState ? '' : selectedJournal?.title
  const moodValue = newState ? '' : selectedJournal?.mood

  useEffect(() => {
    if (newState) {
      setTitle('')
      setText('')
      setMood('')
      return
    }
    setTitle(titleValue)
    setText(selectedJournal?.text)
    setMood(moodValue)
  }, [selectedJournal])

  useEffect(() => {
    let id
    if (formErrors) {
      id = setTimeout(() => {
        setFormErrors([])
      }, 3000)
    }

    return () => clearTimeout(id)
  }, [formErrors])

  function validateForm(title, text, mood) {
    let errors = []
    if (!title) {
      errors.push('Veuillez entrer un titre!')
    }
    if (!text) {
      errors.push('Veuillez entrer un text!')
    }
    if (!mood) {
      errors.push('Veuillez choisir un mood!')
    }
    setFormErrors(errors)
    return errors
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const errors = validateForm(title, text, mood)

    if (errors.length) return

    const id = selectedJournal?.id
    const createdAt = selectedJournal?.createdAt

    let res

    if (newState) {
      res = await addNewJournal(title, text, imageUploaded, mood)
    } else {
      try {
        res = await editSelectedJournal(
          id,
          title,
          text,
          imageUploaded,
          createdAt,
          mood
        )
      } catch (err) {
        console.error(err.message)
      }
    }

    Router.push(`/journal/[id]`, `/journal/${res}`)
  }

  function handleCancel() {
    if (!journals.length) {
      return Router.push(`/profil`)
    }
    if (Router.pathname.includes('nouveau')) {
      undoNewJournal(journals[0]?.id)
      Router.push(`/journal/[id]`, `/journal/${journals[0].id}`)
      return
    }
    Router.push(`/journal/[id]`, `/journal/${id}`)
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0]

    if (file.size > 1000000 * 3) {
      return setImageError('Oupsss! Veuillez choisir une image de moins de 3MB')
    }

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'monjournaldebord')

    setImageName(file.name)

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
        data,
        {
          onUploadProgress: progressEvent => {
            setLoader(
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                '%'
            )
          },
        }
      )
      uploadImage(res.data.secure_url)
    } catch (err) {
      setImageError('Une erreur est survenue. Veuillez réessayer!')
    }
  }

  useEffect(() => {
    if (loader === 100 + '%') {
      setLoader(imageName)
    }
  }, [loader])

  return (
    <Wrapper>
      <DateWrapper>
        <FaCalendarAlt style={{ marginRight: 5, fontSize: 12 }} />
        <DateNow />
      </DateWrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <InputWrapper>
          <Label>Titre</Label>
          <InputField
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus={newState ? true : false}
          />
        </InputWrapper>
        <FormEmoticons
          mood={mood}
          setMood={setMood}
          emoticons={emoticons}
          label="Mood"
        />
        <InputWrapper>
          <Label>Texte</Label>
          <TextAreaField
            name="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Image (optionel)</Label>
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

        {imageError && <p>{imageError}</p>}
        {formErrors &&
          formErrors.map(error => (
            <ErrorMsg key={error}>
              <FaExclamationCircle style={{ marginRight: 5 }} />
              {error}
            </ErrorMsg>
          ))}

        <ButtonWrapper>
          <ButtonCancel
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCancel}
          >
            <FaTimes style={{ marginRight: 7 }} />
            Annuler
          </ButtonCancel>
          <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <FaCheckCircle style={{ marginRight: 7 }} />
            Sauvegarder
          </Button>
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 2;
`

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;
`

const FormWrapper = styled.form``

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #555;
`

const TextAreaField = styled.textarea`
  width: 100%;
  min-height: 25vh;
  padding: 1rem;
  font-size: 1.6rem;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 3px;
  letter-spacing: 0.1em;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 3.5rem;
`

const Button = styled(motion.button)`
  border: none;
  padding: 1em 2em;
  background: var(--primaryColor);
  color: white;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
`

const ButtonCancel = styled(motion.button)`
  border: none;
  padding: 1em 1.5em;
  background: whitesmoke;
  color: crimson;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-right: 2rem;
`

const ButtonUpload = styled(motion.button)`
  border: 1px solid #ddd;
  padding: 0.7em 1.5em;
  color: #666;
  background: white;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  min-width: 18rem;
  margin-top: 0.7rem;
`

const ErrorMsg = styled(motion.span)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  color: red;
  margin-bottom: 1.5rem;
`
