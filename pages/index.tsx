import * as React from "react"
import { NextPage } from "next"

import { Navbar } from "../components/Navbar"
import { Main } from "../components/Main"

const IndexPage: NextPage = () => {
  return (
    <>
      <Navbar />
      <Main />
    </>
  )
}

export default IndexPage
