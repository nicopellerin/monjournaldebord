import * as React from 'react'
import { useContext, useState, useLayoutEffect, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRegEnvelope, FaEdit, FaCheckCircle } from 'react-icons/fa'
import axios from 'axios'

import { UserContext } from '../context/UserProvider'

import { dots } from '../utils/imagesBase64'

export const ProfilInfo = () => {
  const { username, avatar, email, city, updateUserAction } = useContext(
    UserContext
  )
  const [modifiedState, setModifiedState] = useState(false)
  const [cityField, setCityField] = useState(city)
  const [emailField, setEmailField] = useState(email)
  const [newAvatar, setNewAvatar] = useState(avatar)
  const [avatarName, setAvatarName] = useState('')
  const [loader, setLoader] = useState('')
  const [imageError, setImageError] = useState('')
  const [saved, setSaved] = useState(false)

  const uploadImageRef = useRef(null)

  useLayoutEffect(() => {
    if (city) {
      setCityField(city)
    }
    setEmailField(email)
    setNewAvatar(avatar)
  }, [city, email, avatar])

  useEffect(() => {
    if (city !== cityField || avatar !== newAvatar) {
      setModifiedState(true)
    }
  }, [cityField, newAvatar])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      updateUserAction(username, emailField, newAvatar, cityField)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.log(err)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]

    if (file.size > 1000000 * 3) {
      return setImageError('Oupsss! Veuillez choisir une image de moins de 3MB')
    }

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'monjournaldebord_profilepic')

    setAvatarName(file.name)

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

      setNewAvatar(res.data.secure_url)
    } catch (err) {
      setImageError('Une erreur est survenue. Veuillez réessayer!')
    }
  }

  useEffect(() => {
    if (loader === 100 + '%') {
      setLoader(avatarName)
    }
  }, [loader])

  return (
    <>
      <Wrapper animate={{ y: [10, 0] }}>
        <UserImageWrapper>
          <UserImage
            src={newAvatar ? newAvatar : '/default-profile.png'}
            alt="Profil"
          />
          <EditIcon onClick={() => uploadImageRef.current.click()} />
          <input
            ref={uploadImageRef}
            type="file"
            name="file"
            id="file"
            hidden
            onChange={(e) => handleImageUpload(e)}
          />
          {/* <ImageName>{loader}</ImageName> */}
        </UserImageWrapper>
        <Username>{username}</Username>
        <Email>
          <FaRegEnvelope style={{ marginRight: 5 }} />
          {email}
        </Email>
        <DotsWrapper>
          <Dots src={dots} alt="dots" />
        </DotsWrapper>
        <Form>
          <InputWrapper>
            <Label>Ville</Label>
            <InputField
              name="city"
              value={cityField}
              onChange={(e) => setCityField(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Courriel</Label>
            <InputField
              disabled
              name="email"
              value={emailField}
              onChange={(e) => setEmailField(e.target.value)}
            />
          </InputWrapper>
        </Form>
        <AnimatePresence>
          {modifiedState && (
            <ButtonSave
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleSubmit}
              whileHover={{ y: -1 }}
              whileTap={{ y: 1 }}
              saved={saved}
            >
              {saved ? (
                <FaCheckCircle size={24} color="white" />
              ) : (
                `Sauvegarder`
              )}
            </ButtonSave>
          )}
        </AnimatePresence>
      </Wrapper>
      <motion.div
        animate={{ y: [10, 0], opacity: [0, 1] }}
        transition={{ delay: 0.2 }}
      >
        <ButtonDeleteAccount
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Supprimer mon compte
        </ButtonDeleteAccount>
      </motion.div>
    </>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fafafa;
  border: 1px solid #eee;
  border-bottom: 3px solid #ddd;
  padding: 5rem 5rem;
  width: 40rem;
  border-radius: 23px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 7px 15px;
  @media (max-width: 500px) {
    padding: 5rem 6rem;
  }
`
const UserImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const UserImage = styled.img`
  width: 15rem;
  height: 15rem;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  border: 1px solid #ddd;
  padding: 2px;
  margin-bottom: 3rem;
`

const ImageName = styled.span`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  white-space: nowrap;
`

const EditIcon = styled(FaEdit)`
  font-size: 2.4rem;
  position: absolute;
  top: 0.5rem;
  right: 1.2rem;
  background: white;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px;
`

const Username = styled.h2`
  font-size: 3.6rem;
  margin-bottom: 1.8rem;
`

const Email = styled.h3`
  font-size: 1.4rem;
  font-weight: 400;
  color: #440061;
  display: flex;
  align-items: center;
`

const ButtonSave = styled(motion.button)`
  border: none;
  border: ${(props: { saved: boolean }) =>
    props.saved ? '1px solid green' : '1px solid #440061'};
  padding: 1em 1.5em;
  color: #440061;
  background: ${(props: { saved: boolean }) =>
    props.saved ? 'green' : '#fff'};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
  width: 100%;
`

const ButtonDeleteAccount = styled(motion.button)`
  border: none;
  padding: 1em 1.5em;
  background: none;
  color: crimson;
  text-decoration: underline;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 4rem;
  width: 100%;
`

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Dots = styled.img`
  margin: 2rem 0 2rem;
  text-align: center;
`

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 3px;
  letter-spacing: 0.1em;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 100%;
`

const InputField = styled.input`
  width: 100%;
  padding: 0.8em;
  font-size: 1.4rem;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #555;
`

const Form = styled.form`
  width: 100%;
`
