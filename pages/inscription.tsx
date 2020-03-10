import * as React from 'react'
import { useState } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Link from 'next/link'

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

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
        <InputField
          name="password2"
          type="password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          placeholder="Confirmer mot de passe"
        />
        <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          S'inscrire'
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
