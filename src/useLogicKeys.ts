import { useEffect, useState } from 'react'
import { useKeys } from './useKeys'

// returns true if any of the keys are pressed.
export const useAnyKeys = (keys: string[]): boolean => {
  const [isKeyDown, setisKeyDown] = useState(false)
  const keyStatuses = useKeys(keys)

  useEffect(() => {
    if (Object.values(keyStatuses).includes(true)) {
      setisKeyDown(true)
    } else {
      setisKeyDown(false)
    }
  }, [keyStatuses])

  return isKeyDown
}

// returns true if all of the keys are pressed.
export const useAllKeys = (keys: string[]): boolean => {
  const [isKeyDown, setisKeyDown] = useState(false)
  const keyStatuses = useKeys(keys)

  useEffect(() => {
    if (!Object.values(keyStatuses).includes(false)) {
      setisKeyDown(true)
    } else {
      setisKeyDown(false)
    }
  }, [keyStatuses])

  return isKeyDown
}
