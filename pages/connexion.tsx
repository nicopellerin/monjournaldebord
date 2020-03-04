import React, { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { CtaCard } from '../components/shared/CtaCard'

const Connexion: React.FC = () => {
  return (
    <>
      <Head>
        <title>Connexion | Mon Journal De Bord</title>
      </Head>
      <Wrapper>
        <CtaCard title="Connexion" render={<ConnexionForm />} />
      </Wrapper>
    </>
  )
}

const ConnexionForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputField
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Courriel"
        />
        <InputField
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mot de passe"
        />
        <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Se Connecter
        </Button>
      </Form>
      <Link href="/inscription">
        <Astyled>
          Vous n'avez pas de compte? Cliquez içi pour vous inscrire
        </Astyled>
      </Link>
    </>
  )
}

export default Connexion

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
