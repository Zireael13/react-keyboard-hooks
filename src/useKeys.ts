import { useEffect, useState } from 'react'
import useSSR from 'use-ssr'
import { keyStatuses } from './types'

// returns an object with each key and its' current status.

export const useKeys = (keys: string[]): keyStatuses => {
  const { isBrowser } = useSSR()
  const [keyStatuses, setKeyStatuses] = useState<keyStatuses>(() =>
    Object.fromEntries(keys.map((key) => [key, false]))
  )

  useEffect(() => {
    const keyDown = (e: KeyboardEvent): void => {
      if (e.key in keyStatuses) {
        setKeyStatuses((prevState) => ({ ...prevState, [e.key]: true }))
      }
    }
    const keyUp = (e: KeyboardEvent): void => {
      if (e.key in keyStatuses) {
        setKeyStatuses((prevState) => ({ ...prevState, [e.key]: false }))
      }
    }

    if (isBrowser) {
      window.addEventListener('keydown', keyDown)
      window.addEventListener('keyup', keyUp)
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('keydown', keyDown)
        window.removeEventListener('keyup', keyUp)
      }
    }
  }, [isBrowser, keyStatuses])

  return keyStatuses
}
