import React, { useContext } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import { Card } from "./Card"

import { JournalContext } from "../../context/JournalProvider"

export const CardList: React.FC = () => {
  const { journals } = useContext(JournalContext)

  const parentVariants = {
    load: {
      x: [-10, 0],
      opacity: [0, 1],
      transition: { staggerChildren: 0.5 }
    }
  }

  return (
    <Wrapper>
      <ListWrapper variants={parentVariants} animate={"load"}>
        {journals.slice(0, 3).map(journal => (
          <Card key={journal.id} {...journal} />
        ))}
      </ListWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  padding: 3rem;
`

const ListWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-gap: 3rem;
`
