import * as React from 'react'
import { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  FaCheckCircle,
  FaTimes,
  FaCalendarAlt,
  FaUpload,
  FaExclamationCircle,
  FaUserLock,
  FaUsers,
  FaSearchPlus,
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import axios from 'axios'
import Router, { useRouter } from 'next/router'

import { DateNow } from './DateNow'

import { JournalContext } from '../context/JournalProvider'
import { FormEmoticons } from './FormEmoticons'
import { maxLength } from '../utils/maxLength'
import {
  angry,
  sleepy,
  sick,
  sad,
  angel,
  love,
  crazy,
  happy,
} from '../utils/emoticonsBase64'

export const emoticons = [
  { id: 1, type: 'Joyeux(se)', path: happy },
  { id: 2, type: 'Fou/folle', path: crazy },
  { id: 3, type: 'En amour', path: love },
  { id: 4, type: 'Aux anges', path: angel },
  { id: 5, type: 'Triste', path: sad },
  { id: 6, type: 'Malade', path: sick },
  { id: 7, type: 'Fatigué(e)', path: sleepy },
  { id: 8, type: 'Fâché(e)', path: angry },
]

type Props = {
  loader: string
  setLoader: React.Dispatch<React.SetStateAction<string>>
  togglePreview: boolean
  setTogglePreview: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  mood: string
  setMood: React.Dispatch<React.SetStateAction<string>>
  status: string
  setStatus: React.Dispatch<React.SetStateAction<string>>
  imageName: string
  setImageName: React.Dispatch<React.SetStateAction<string>>
}

export const FormFormatOne: React.FC<Props> = ({
  loader,
  setLoader,
  setTogglePreview,
  title,
  setTitle,
  text,
  setText,
  mood,
  setMood,
  status,
  setStatus,
  imageName,
  setImageName,
}) => {
  const {
    selectedJournal,
    editSelectedJournalAction,
    addNewJournalAction,
    newState,
    uploadImageAction,
    imageUploaded,
  } = useContext(JournalContext)

  const {
    query: { id },
  } = useRouter()

  const [imageError, setImageError] = useState('')
  const [formErrors, setFormErrors] = useState([])

  const imageInputRef = useRef(null)

  const titleValue = newState ? '' : selectedJournal?.title
  const moodValue = newState ? '' : selectedJournal?.mood
  const statusValue = newState ? 'private' : selectedJournal?.status

  useEffect(() => {
    if (newState) {
      setTitle('')
      setText('')
      setMood('')
      setStatus('private')
      return
    }
    setTitle(titleValue)
    setText(selectedJournal?.text)
    setMood(moodValue)
    setStatus(statusValue)
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

    let res

    if (newState) {
      res = await addNewJournalAction(title, text, imageUploaded, mood, status)
    } else {
      try {
        res = await editSelectedJournalAction(
          id,
          title,
          text,
          imageUploaded,
          mood,
          status
        )
      } catch (err) {
        console.error(err.message)
      }
    }

    Router.push(`/journal/[id]`, `/journal/${res}`)
  }

  function handleCancel() {
    if (!newState) {
      Router.push(`/journal/[id]`, `/journal/${id}`)
      return
    }

    return Router.push(`/profil`, '/profil')
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
        `https://api.cloudinary.com/v1_1/${process.env.cloudinary_name}/image/upload`,
        data,
        {
          onUploadProgress: (progressEvent) => {
            setLoader(
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                '%'
            )
          },
        }
      )
      uploadImageAction(res.data.secure_url)
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
      {!newState && (
        <DateWrapper>
          <FaCalendarAlt style={{ marginRight: 5, fontSize: 12 }} />
          <DateNow dateInfo={selectedJournal?.createdAt} />
        </DateWrapper>
      )}
      <FormWrapper onSubmit={handleSubmit}>
        <InputWrapper>
          <Label>Titre</Label>
          <InputField
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setText(e.target.value)}
          />
        </InputWrapper>
        <TwoCols>
          <InputWrapper>
            <Label>Type de publication</Label>
            <ToggleSwitch
              onClick={() =>
                setStatus((prevState) =>
                  prevState === 'private' ? 'public' : 'private'
                )
              }
            >
              <ToggleSwitchCheckbox type="checkbox" name="status" id="status" />
              <ToggleSwitchLabel>
                <ToggleSwitchInner
                  isPrivate={status === 'private' ? true : false}
                />
                <ToggleSwitchSwitch
                  isPrivate={status === 'private' ? true : false}
                >
                  {status === 'private' ? (
                    <FaUserLock color="white" />
                  ) : (
                    <FaUsers color="white" />
                  )}
                </ToggleSwitchSwitch>
              </ToggleSwitchLabel>
            </ToggleSwitch>
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
              onClick={() => imageInputRef.current.click()}
            >
              <FaUpload style={{ marginRight: 7 }} />
              {!loader ? 'Choisir image...' : maxLength(loader, 30)}
            </ButtonUpload>
          </InputWrapper>
        </TwoCols>
        {imageError && <p>{imageError}</p>}
        {formErrors &&
          formErrors.map((error) => (
            <ErrorMsg key={error}>
              <FaExclamationCircle style={{ marginRight: 5 }} />
              {error}
            </ErrorMsg>
          ))}

        <ButtonWrapper>
          <ButtonPreview
            disabled={!title || !mood || !text}
            type="button"
            onClick={() => setTogglePreview(true)}
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
          >
            <FaSearchPlus style={{ marginRight: 7 }} />
            Aperçu
          </ButtonPreview>
          <ButtonCancel
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
            onClick={handleCancel}
          >
            <FaTimes style={{ marginRight: 7 }} />
            Annuler
          </ButtonCancel>
          <Button whileHover={{ y: -1 }} whileTap={{ y: 1 }}>
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
  margin-bottom: 1.8rem;
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
  min-height: 24vh;
  padding: 1rem;
  font-size: 1.5rem;
  font-family: inherit;
  line-height: 1.4em;
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

const TwoCols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3rem;
  margin-top: 2rem;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 3.5rem;
`

const Button = styled(motion.button)`
  border: none;
  /* border-bottom: 3px solid #440061; */
  padding: 1em 2em;
  background: var(--primaryColor);
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
`

const ButtonPreview = styled(motion.button)`
  border: 1px solid #ddd;
  padding: 1em 2em;
  background: #fff;
  color: #333;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
  margin-inline-end: auto;
`

const ButtonCancel = styled(motion.button)`
  border: 1px solid #ddd;
  padding: 1em 2em;
  background: #fff;
  color: red;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-right: 2rem;
  font-weight: 500;
`

const ButtonUpload = styled(motion.button)`
  border: 1px solid #ddd;
  padding: 0.7em 1.5em;
  color: #666;
  background: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  min-width: 18rem;
  margin-top: 0.7rem;
  font-weight: 500;
`

const ErrorMsg = styled(motion.span)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  color: red;
  margin-bottom: 1.5rem;
`

const ToggleSwitch = styled.div`
  position: relative;
  width: 95px;
  display: inline-block;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  text-align: left;
  margin-top: 0.9rem;
`

const ToggleSwitchCheckbox = styled.input`
  display: none;
`

const ToggleSwitchLabel = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin: 0;
  box-shadow: inset rgba(0, 0, 0, 0.1) 0px 7px 15px;
`

const ToggleSwitchInner = styled.span`
  display: block;
  width: 200%;
  margin-left: ${(props: { isPrivate: boolean }) =>
    props.isPrivate ? 0 : '-100%'};
  transition: margin 0.3s ease-in 0s;

  &:before,
  :after {
    display: block;
    float: left;
    width: 50%;
    height: 25px;
    padding: 0;
    line-height: 25px;
    font-size: 1.4em;
    color: white;
    font-family: inherit;
    font-weight: 500;
    box-sizing: border-box;
  }

  &:before {
    content: 'Privé';
    padding-left: 15px;
    background-color: #fff;
    color: #440061;
  }

  &:after {
    content: 'Blogue';
    padding-right: 13px;
    background-color: #fff;
    color: green;
    text-align: right;
  }
`

const ToggleSwitchSwitch = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  margin: 0px;
  background: ${(props: { isPrivate: boolean }) =>
    props.isPrivate ? '#440061' : 'green'};
  position: absolute;
  top: -1px;
  bottom: 0;
  right: ${(props: { isPrivate: boolean }) =>
    props.isPrivate ? '0px' : '67px'};
  border: 1px solid #ccc;
  border-radius: 50%;
  transition: all 0.3s ease-in 0s;
`
