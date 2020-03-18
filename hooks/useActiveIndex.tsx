import { useState, useRef, useCallback } from 'react'
import { wrap } from '@popmotion/popcorn'

export const useActiveIndex = maxIndex => {
  const [activeIndex, setActiveIndex] = useState(0)
  const direction = useRef(null)

  return {
    activeIndex,
    lastDirection: direction.current,
    setActiveIndex: useCallback(
      nextIndex => {
        setActiveIndex(activeIndex => {
          direction.current = activeIndex > nextIndex ? -1 : 1
          return wrap(0, maxIndex, nextIndex)
        })
      },
      [maxIndex]
    ),
    moveActiveIndex: useCallback(
      amountToMove => {
        setActiveIndex(activeIndex => {
          const nextIndex = activeIndex + amountToMove
          direction.current = activeIndex > nextIndex ? -1 : 1
          return wrap(0, maxIndex, nextIndex)
        })
      },
      [maxIndex]
    ),
  }
}
