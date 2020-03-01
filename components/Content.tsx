import React, { useContext, useEffect, useRef } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"

import { Book } from "./Book"
import { JournalSingle } from "./JournalSingle"
import { Home } from "./Home"

import { JournalContext } from "../context/JournalProvider"

export const Content: React.FC = () => {
  const { editing, selectJournal, journals } = useContext(JournalContext)

  const { pathname } = useRouter()

  // const firstLoad = useRef(false)

  // useEffect(() => {
  //   if (!firstLoad.current) {
  //     firstLoad.current = true
  //     selectJournal(journals[0].id)
  //   }
  // }, [])

  if (pathname === "/profil") {
    return <Home />
  }

  if (pathname.includes("edit") || pathname.includes("nouveau")) {
    return (
      <Wrapper>
        <Book />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <JournalSingle />
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ghostwhite;
`
