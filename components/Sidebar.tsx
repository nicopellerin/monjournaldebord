import React, { useContext } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { FaPlusCircle } from "react-icons/fa"

import { List } from "./List"

import { JournalContext } from "../context/JournalProvider"

export const Sidebar: React.FC = () => {
  const { newPage } = useContext(JournalContext)

  return (
    <Wrapper>
      <List />
      <Button
        onClick={newPage}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaPlusCircle style={{ marginRight: 7 }} />
        Nouvelle page
      </Button>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  background: whitesmoke;
  width: 100%;
  height: 100%;
  box-shadow: 4px 0px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 0;
`

const Button = styled(motion.button)`
  border: none;
  padding: 1em 2em;
  background: darkviolet;
  color: white;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
`
