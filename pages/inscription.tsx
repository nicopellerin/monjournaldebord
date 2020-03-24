import * as React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FaUpload, FaUserAlt, FaExclamationCircle } from 'react-icons/fa'
import axios from 'axios'
import cookies from 'js-cookie'
import Router from 'next/router'
import { Circle } from 'better-react-spinkit'

import { CtaCard } from '../components/shared/CtaCard'
import { UserContext } from '../context/UserProvider'
import { maxLength } from '../utils/maxLength'

const Inscription: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inscription | monjournaldebord</title>
      </Head>
      <Wrapper>
        <CtaCard title="Inscription" render={<InscriptionForm />} />
      </Wrapper>
    </>
  )
}

const InscriptionForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [avatarName, setAvatarName] = useState('')
  const [loader, setLoader] = useState('')
  const [imageError, setImageError] = useState('')
  const [formErrors, setFormErrors] = useState('')
  const [isSubmiting, setIsSubmiting] = useState(false)
  // const [password2, setPassword2] = useState('')

  const { signup } = useContext(UserContext)

  const imageInputRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!username || !email || !password) {
      return setFormErrors('Veuillez remplir tous les champs requis')
    }

    if (password.length < 6) {
      return setFormErrors(
        'Veuillez entrer un mot de passe de plus de 6 charactères'
      )
    }

    setIsSubmiting(true)

    try {
      const token = await signup(username, email, password, avatar)
      cookies.set('token_login', token)
      Router.push('/profil')
    } catch (err) {
      console.error(err.message)
      setFormErrors(err.message.replace('GraphQL error:', ''))
    } finally {
      setIsSubmiting(false)
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0]

    if (file.size > 1000000 * 3) {
      return setImageError('Oupsss! Veuillez choisir une image de moins de 3MB')
    }

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'monjournaldebord')

    setAvatarName(file.name)

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

      setAvatar(res.data.secure_url)
    } catch (err) {
      setImageError('Une erreur est survenue. Veuillez réessayer!')
    }
  }

  useEffect(() => {
    if (loader === 100 + '%') {
      setLoader(avatarName)
    }
  }, [loader])

  useEffect(() => {
    if (formErrors) {
      setTimeout(() => {
        setFormErrors('')
      }, 3000)
    }
  }, [formErrors])

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">Nom d'utilisateur</Label>
        <InputField
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Label htmlFor="email">Courriel</Label>
        <InputField
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Label htmlFor="password">Mot de passe</Label>
        <InputField
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {/* <InputField
          name="password2"
          type="password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          placeholder="Confirmer mot de passe"
        /> */}
        <input
          id="avatar"
          name="avatar"
          type="file"
          ref={imageInputRef}
          onChange={handleImageUpload}
          hidden
        />
        <Label htmlFor="avatar">Avatar (optionel)</Label>
        <ButtonUpload
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => imageInputRef.current.click()}
        >
          <FaUpload style={{ marginRight: 7 }} />
          {!loader ? 'Choisir image...' : maxLength(loader, 30)}
        </ButtonUpload>
        <Button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmiting}
        >
          {isSubmiting ? (
            <Circle color="white" />
          ) : (
            <>
              <FaUserAlt style={{ marginRight: 7 }} />
              S'inscrire
            </>
          )}
        </Button>
      </Form>
      <AnimatePresence>
        <>
          {imageError && (
            <ErrorMsg
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <FaExclamationCircle style={{ marginRight: 5 }} />
              {imageError}
            </ErrorMsg>
          )}
          {formErrors && (
            <ErrorMsg
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <FaExclamationCircle style={{ marginRight: 5 }} />
              {formErrors}
            </ErrorMsg>
          )}
        </>
      </AnimatePresence>
      <Link href="/connexion">
        <Astyled>
          Vous avez déj&agrave; un compte? Cliquez içi pour vous connecter
        </Astyled>
      </Link>
    </>
  )
}

export default Inscription

// Styles
const Wrapper = styled.div`
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3rem;
`

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1.8rem;
  color: #555;
`

const Button = styled(motion.button)`
  border: none;
  padding: 1em 2em;
  background: var(--primaryColor);
  border-bottom: 3px solid #440061;
  color: white;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
`

const Astyled = styled.a`
  font-size: 1.2rem;
  color: #555;
  text-decoration: none;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 500px) {
    max-width: 28ch;
    line-height: 1.4em;
  }
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
  margin-bottom: 2rem;
`

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 3px;
  letter-spacing: 0.1em;
`

const ErrorMsg = styled(motion.span)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  color: red;
  margin-bottom: 3rem;
`
