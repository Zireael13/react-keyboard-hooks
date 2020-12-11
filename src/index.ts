import { useEffect, useState } from 'react'
import useSSR from 'use-ssr'

export const useKey = (key: string): { keyStatus: string } => {
  const { isBrowser } = useSSR()
  const [keyStatus, setKeyStatus] = useState('up')

  useEffect(() => {
    const keyDown = (e: KeyboardEvent): void => {
      if (e.key === key) {
        setKeyStatus('down')
      }
    }
    const keyUp = (e: KeyboardEvent): void => {
      if (e.key === key) {
        setKeyStatus('up')
      }
    }

    if (isBrowser) {
      window.addEventListener('keydown', keyDown)
      window.addEventListener('keyup', keyUp)
    }

    return () => {
      window.removeEventListener('keydown', keyDown)
      window.removeEventListener('keyup', keyUp)
    }
  }, [isBrowser, key])

  return { keyStatus }
}

// TODO: edge case where multiple keys are pressed and one is released?

export const useKeys = (keys: string[]): { keyStatus: string } => {
  const { isBrowser } = useSSR()
  const [keyStatus, setKeyStatus] = useState('up')

  useEffect(() => {
    const keyDown = (e: KeyboardEvent): void => {
      if (keys.includes(e.key)) {
        setKeyStatus('down')
      }
    }
    const keyUp = (e: KeyboardEvent): void => {
      if (keys.includes(e.key)) {
        setKeyStatus('up')
      }
    }

    if (isBrowser) {
      window.addEventListener('keydown', keyDown)
      window.addEventListener('keyup', keyUp)
    }

    return () => {
      window.removeEventListener('keydown', keyDown)
      window.removeEventListener('keyup', keyUp)
    }
  }, [isBrowser, keys])

  return { keyStatus }
}
