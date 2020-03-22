import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { UserContext } from '../context/UserProvider'
import { FaUserSecret } from 'react-icons/fa'

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
        <Email>{email}</Email>
        <ButtonPassword whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <FaUserSecret style={{ marginRight: 7 }} />
          Changer mot de passe
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
          Supprimer compte
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
  border-bottom: 3px solid #ddd;
  padding: 7rem 9rem;
  border-radius: 23px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
`

const UserImage = styled.img`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  border: 1px solid #ddd;
  padding: 2px;
  margin-bottom: 3rem;
`

const Username = styled.h2`
  font-size: 4.2rem;
  margin-bottom: 1.8rem;
`

const Email = styled.h3`
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 6rem;
  color: #440061;
`

const ButtonPassword = styled(motion.button)`
  border: none;
  border: 1px solid #440061;
  border-bottom: 3px solid #440061;
  padding: 1em 1.5em;
  /* background: ghostwhite; */
  color: #440061;
  /* text-transform: uppercase; */
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  /* margin-bottom: 3rem; */
`

const ButtonDeleteAccount = styled(motion.button)`
  border: none;
  padding: 1em 1.5em;
  background: none;
  color: crimson;
  text-transform: uppercase;
  text-decoration: underline;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 4rem;
`
