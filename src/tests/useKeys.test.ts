import { useKeys } from '../useKeys'
import { renderHook, act } from '@testing-library/react-hooks'
import { createKeyDown, createKeyUp } from './utils'

// tests for useKeys (array)
test('useKeys Up -> Down -> Up', () => {
  const keys = ['1', '2']

  const { result } = renderHook(() => useKeys(keys))

  const keyDown = createKeyDown(keys[0])
  const keyUp = createKeyUp(keys[0])

  act(() => {
    window.dispatchEvent(keyDown)
  })

  expect(result.current[keys[0]]).toBe(true)

  act(() => {
    window.dispatchEvent(keyUp)
  })

  expect(result.current[keys[0]]).toBe(false)
})
