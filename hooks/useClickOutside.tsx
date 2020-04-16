import { useEffect, useRef } from 'react'

export const useClickOutside = (setToggle) => {
  const node = useRef(null)

  function handleClick(e: MouseEvent) {
    if (!node?.current?.contains(e.target)) {
      setToggle(false)
    }
  }

  console.log(node?.current)

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('contextmenu', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('contextmenu', handleClick)
    }
  }, [])

  return node
}
