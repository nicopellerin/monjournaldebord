import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { UserContext } from '../context/UserProvider'
import { FaUserLock, FaRegEnvelope, FaEnvelope } from 'react-icons/fa'

export const ProfilInfo = () => {
  const { username, avatar, email } = useContext(UserContext)

  return (
    <>
      <Wrapper animate={{ y: [10, 0], opacity: [0, 1] }}>
        <UserImage
          src={avatar ? avatar : '/default-profile.png'}
          alt="Profil"
        />
        <Username>{username}</Username>
        <Email>
          <FaRegEnvelope style={{ marginRight: 5 }} />
          {email}
        </Email>
        <Dots>&#8411;</Dots>
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
  border-top: 15px solid #eee;
  border-bottom: 3px solid #ddd;
  padding: 5rem 9rem;
  border-radius: 23px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px;
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
  border-bottom: 3px solid #440061;
  padding: 0.9em 1.5em;
  color: #440061;
  background: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;
`

const ButtonEmail = styled(motion.button)`
  border: none;
  border: 1px solid #440061;
  border-bottom: 3px solid #440061;
  padding: 0.9em 1.5em;
  color: #440061;
  background: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  font-weight: bold;
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
`

const Dots = styled.span`
  display: block;
  font-size: 5rem;
  text-align: center;
  margin-left: 13px;
`
