import * as React from 'react'
import { useContext, useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { UserContext } from '../context/UserProvider'
import { FaUserLock, FaRegEnvelope, FaEnvelope } from 'react-icons/fa'
import { dots } from '../utils/imagesBase64'

export const ProfilInfo = () => {
  const { username, avatar, email, city, updateCityAction } = useContext(
    UserContext
  )
  const [cityField, setCityField] = useState('')

  useLayoutEffect(() => {
    if (city) {
      setCityField(city)
    }
  }, [city])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateCityAction(username, cityField)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Wrapper animate={{ y: [10, 0] }}>
        <UserImage
          src={avatar ? avatar : '/default-profile.png'}
          alt="Profil"
        />
        <Username>{username}</Username>
        <Email>
          <FaRegEnvelope style={{ marginRight: 5 }} />
          {email}
        </Email>
        <DotsWrapper>
          <Dots src={dots} alt="dots" />
        </DotsWrapper>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Label>Ville</Label>
            <InputField
              name="text"
              value={cityField}
              onChange={(e) => setCityField(e.target.value)}
            />
          </InputWrapper>
        </Form>
        <ButtonEmail whileHover={{ y: -1 }} whileTap={{ y: 1 }}>
          <FaEnvelope style={{ marginRight: 5 }} />
          Modifier courriel
        </ButtonEmail>
        <ButtonPassword whileHover={{ y: -1 }} whileTap={{ y: 1 }}>
          <FaUserLock style={{ marginRight: 5 }} />
          Nouveau mot de passe
        </ButtonPassword>
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
  padding: 5rem 9rem;
  border-radius: 23px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 7px 15px;
  @media (max-width: 500px) {
    padding: 5rem 6rem;
  }
`

const UserImage = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  border: 1px solid #ddd;
  padding: 2px;
  margin-bottom: 3rem;
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

const ButtonPassword = styled(motion.button)`
  border: none;
  border: 1px solid #440061;
  padding: 1em 1.5em;
  color: #440061;
  background: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
`

const ButtonEmail = styled(motion.button)`
  border: none;
  border: 1px solid #440061;
  padding: 1em 1.5em;
  color: #440061;
  background: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-bottom: 2rem;
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
  padding: 1rem;
  font-size: 1.4rem;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #555;
`

const Form = styled.form`
  width: 100%;
`
