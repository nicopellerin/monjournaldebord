import React from "react"
import { NextPage } from "next"

import { Navbar } from "../components/Navbar"
import { Main } from "../components/Main"

const SinglePage: NextPage = () => {
  return (
    <>
      <Navbar />
      <Main />
    </>
  )
}

export default SinglePage
