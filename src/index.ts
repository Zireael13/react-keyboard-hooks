import { useEffect, useState } from 'react'
import useSSR from 'use-ssr'

export type keyStatuses = 'up' | 'down'

export const useKey = (key: string): { keyStatus: keyStatuses } => {
  const { isBrowser } = useSSR()
  const [keyStatus, setKeyStatus] = useState<keyStatuses>('up')

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
// test push

export const useKeys = (keys: string[]): { keyStatus: keyStatuses } => {
  const { isBrowser } = useSSR()
  const [keyStatus, setKeyStatus] = useState<keyStatuses>('up')

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
      if (isBrowser) {
        window.removeEventListener('keydown', keyDown)
        window.removeEventListener('keyup', keyUp)
      }
    }
  }, [isBrowser, keys])

  return { keyStatus }
}
