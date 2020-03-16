import * as React from 'react'
import { useState, useRef } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaUpload } from 'react-icons/fa'

import { CtaCard } from '../components/shared/CtaCard'

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
  const [loader, setLoader] = useState('')
  // const [password2, setPassword2] = useState('')

  const imageInputRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
  }

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
          onChange={e => setPassword(e.target.value)}
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
          {!loader ? 'Choisir image...' : loader}
        </ButtonUpload>
        <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          S'inscrire
        </Button>
      </Form>
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 75px);
`

const Form = styled.div`
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
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
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
  margin-bottom: 2rem;
`

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 3px;
  letter-spacing: 0.1em;
`
