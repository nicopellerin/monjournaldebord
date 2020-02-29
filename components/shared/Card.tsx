import React, { useContext } from "react"
import styled from "styled-components"
import { FaCalendar } from "react-icons/fa"
import Link from "next/link"
import { motion } from "framer-motion"

import { DateNow } from "../DateNow"

import { JournalContext } from "../../context/JournalProvider"

import { maxLength } from "../../utils/maxLength"

type Props = {
  id: string
  title: string
  text: string
}

export const Card: React.FC<Props> = ({ id, title, text }) => {
  const { selectJournal } = useContext(JournalContext)

  return (
    <Link href={`/[id]`} as={`/${id}`}>
      <AStyled>
        <Wrapper whileHover={{ scale: 1.02 }} onClick={() => selectJournal(id)}>
          <Title>{maxLength(title, 20)}</Title>
          <DateWrapper>
            <FaCalendar style={{ marginRight: 5 }} />
            <DateNow />
          </DateWrapper>
          <Text>{maxLength(text, 280)}</Text>
        </Wrapper>
      </AStyled>
    </Link>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  padding: 3rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 100%;
`

const Title = styled.h2`
  font-size: 3rem;
`

const Text = styled.p`
  font-size: 1.4rem;
`

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
`

const AStyled = styled.a`
  text-decoration: none;
`
