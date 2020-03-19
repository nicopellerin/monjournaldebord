import * as React from 'react'
import { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import cookies from 'js-cookie'
import Router from 'next/router'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { Circle } from 'better-react-spinkit'
import Lottie from 'react-lottie'

import { CtaCard } from '../components/shared/CtaCard'

import successAnimation from '../lotties/success.json'

import { UserContext } from '../context/UserProvider'
import { withApollo } from '../lib/apollo'

const connexionOptions = {
  loop: false,
  autoplay: true,
  animationData: successAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const Connexion: NextPage = () => {
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [success, setSuccess] = useState(false)

  return (
    <>
      <Head>
        <title>Connexion | monjournaldebord</title>
      </Head>
      <Wrapper>
        {success ? (
          <motion.div
            animate={{ scale: [0.9, 1] }}
            transition={{ yoyo: Infinity, duration: 2 }}
            exit={{ opacity: 0 }}
          >
            <Lottie
              options={connexionOptions}
              height={200}
              width={200}
              isStopped={isSubmiting}
            />
            <Connected>Vous êtes maintenant connecté</Connected>
          </motion.div>
        ) : (
          <CtaCard
            title="Connexion"
            render={
              <ConnexionForm
                setSuccess={setSuccess}
                isSubmiting={isSubmiting}
                setIsSubmiting={setIsSubmiting}
              />
            }
          />
        )}
      </Wrapper>
    </>
  )
}

interface FormProps {
  isSubmiting: boolean
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
  setIsSubmiting: React.Dispatch<React.SetStateAction<boolean>>
}

const ConnexionForm: React.FC<FormProps> = ({
  setSuccess,
  setIsSubmiting,
  isSubmiting,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const { login } = useContext(UserContext)

  async function handleSubmit(e) {
    e.preventDefault()

    setIsSubmiting(true)

    try {
      const token = await login(email, password)
      // const in15Minutes = new Date(new Date().getTime() + 15 * 60 * 1000)
      cookies.set('token_login', token, { expires: 7 })
      setSuccess(true)
      setTimeout(() => Router.push('/profil'), 1000)
    } catch (err) {
      console.error(err.message)
      setLoginError(err.message.replace('GraphQL error:', ''))
    } finally {
      setIsSubmiting(false)
    }
  }

  useEffect(() => {
    let id
    if (loginError) {
      id = setTimeout(() => {
        setLoginError('')
      }, 3000)
    }
    return () => clearTimeout(id)
  }, [loginError])

  return (
    <AnimatePresence>
      <>
        <Form onSubmit={handleSubmit} exit={{ opacity: 0 }}>
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
          <Button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmiting}
          >
            {isSubmiting ? (
              <Circle color="white" />
            ) : (
              <>
                <FaSignInAlt style={{ marginRight: 7 }} /> Se Connecter
              </>
            )}
          </Button>
        </Form>
        {loginError && (
          <AnimatePresence>
            <ErrorMsg
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <FaExclamationCircle style={{ marginRight: 5 }} />
              {loginError}
            </ErrorMsg>
          </AnimatePresence>
        )}
        <Link href="/inscription">
          <Astyled>
            Vous n'avez pas de compte? Cliquez içi pour vous inscrire
          </Astyled>
        </Link>
      </>
    </AnimatePresence>
  )
}

export default withApollo(Connexion)

// Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Form = styled(motion.form)`
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

const Connected = styled.h2`
  font-size: 2.4rem;
  font-weight: 400;
  margin-top: 3rem;
`
