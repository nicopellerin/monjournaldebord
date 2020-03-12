import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

export const withAnimatePresence = Component => {
  const WithAnimatePresence = ({ ...props }) => {
    const router = useRouter()
    console.log({ props })
    return (
      <AnimatePresence exitBeforeEnter>
        <Component {...props} key={props.routerRoute} />
      </AnimatePresence>
    )
  }

  return WithAnimatePresence
}
