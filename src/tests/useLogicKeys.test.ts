import { useAllKeys, useAnyKeys } from '../useLogicKeys'
import { renderHook, act } from '@testing-library/react-hooks'
import { createKeyDown, createKeyUp } from './utils'

/* useAnyKeys tests */

test('useAnyKeys Default', () => {
  const keys = ['1', '2', ' ']

  const { result } = renderHook(() => useAnyKeys(keys))

  expect(result.current).toBe(false)
})
test('useAnyKeys One Up -> Down -> Up', () => {
  const keys = ['1', '2', ' ']

  const { result } = renderHook(() => useAnyKeys(keys))

  expect(result.current).toBe(false)

  const keyDowns = keys.map((key) => createKeyDown(key))
  const keyUps = keys.map((key) => createKeyUp(key))

  act(() => {
    window.dispatchEvent(keyDowns[0])
  })

  expect(result.current).toBe(true)

  act(() => {
    window.dispatchEvent(keyUps[0])
  })

  expect(result.current).toBe(false)
})

test('useAnyKeys All Up -> Down -> Up', () => {
  const keys = ['1', '2', ' ']

  const { result } = renderHook(() => useAnyKeys(keys))

  expect(result.current).toBe(false)

  const keyDowns = keys.map((key) => createKeyDown(key))
  const keyUps = keys.map((key) => createKeyUp(key))

  act(() => {
    keyDowns.forEach((e) => window.dispatchEvent(e))
  })

  expect(result.current).toBe(true)

  act(() => {
    keyUps.forEach((e) => window.dispatchEvent(e))
  })

  expect(result.current).toBe(false)
})

/* useAllKeys tests */

test('useAllKeys Default', () => {
  const keys = ['1', '2', ' ']

  const { result } = renderHook(() => useAllKeys(keys))

  expect(result.current).toBe(false)
})

test('useAllKeys One Up -> Down -> Up', () => {
  const keys = ['1', '2', ' ']

  const { result } = renderHook(() => useAllKeys(keys))

  expect(result.current).toBe(false)

  const keyDowns = keys.map((key) => createKeyDown(key))
  const keyUps = keys.map((key) => createKeyUp(key))

  act(() => {
    window.dispatchEvent(keyDowns[0])
  })

  expect(result.current).toBe(false)

  act(() => {
    window.dispatchEvent(keyUps[0])
  })

  expect(result.current).toBe(false)
})

test('useAllKeys Two Up -> Down -> Up', () => {
  const keys = ['1', '2', ' ']

  const { result } = renderHook(() => useAllKeys(keys))

  expect(result.current).toBe(false)

  const keyDowns = keys.map((key) => createKeyDown(key))
  const keyUps = keys.map((key) => createKeyUp(key))

  act(() => {
    window.dispatchEvent(keyDowns[0])
    window.dispatchEvent(keyDowns[1])
  })

  expect(result.current).toBe(false)

  act(() => {
    window.dispatchEvent(keyUps[0])
    window.dispatchEvent(keyUps[1])
  })

  expect(result.current).toBe(false)
})

test('useAllKeys All Up -> Down -> Up', () => {
  const keys = ['1', '2', ' ']

  const { result } = renderHook(() => useAllKeys(keys))

  expect(result.current).toBe(false)

  const keyDowns = keys.map((key) => createKeyDown(key))
  const keyUps = keys.map((key) => createKeyUp(key))

  act(() => {
    keyDowns.forEach((e) => window.dispatchEvent(e))
  })

  expect(result.current).toBe(true)

  act(() => {
    keyUps.forEach((e) => window.dispatchEvent(e))
  })

  expect(result.current).toBe(false)
})
