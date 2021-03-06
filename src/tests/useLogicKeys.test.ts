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

test('useAnyKeys One Up -> Down -> Up Callback', () => {
  const cb = jest.fn()
  const keys = ['1', '2', ' ']

  const { result } = renderHook(() => useAnyKeys(keys, cb))

  expect(result.current).toBe(false)
  expect(cb.mock.calls.length).toBe(0)

  const keyDowns = keys.map((key) => createKeyDown(key))
  const keyUps = keys.map((key) => createKeyUp(key))

  act(() => {
    window.dispatchEvent(keyDowns[0])
  })

  expect(result.current).toBe(true)
  expect(cb.mock.calls.length).toBe(1)

  act(() => {
    window.dispatchEvent(keyUps[0])
  })

  expect(result.current).toBe(false)
  expect(cb.mock.calls.length).toBe(1)
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

test('useAnyKeys All Up -> Down -> Up Callback', () => {
  const cb = jest.fn()
  const keys = ['1', '2', ' ']

  const { result } = renderHook(() => useAnyKeys(keys, cb))

  expect(result.current).toBe(false)
  expect(cb.mock.calls.length).toBe(0)

  const keyDowns = keys.map((key) => createKeyDown(key))
  const keyUps = keys.map((key) => createKeyUp(key))

  act(() => {
    keyDowns.forEach((e) => window.dispatchEvent(e))
  })

  expect(cb.mock.calls.length).toBe(1)
  // only one call, doesn't repeat action if you are hitting multiple Any keys
  expect(result.current).toBe(true)

  act(() => {
    keyUps.forEach((e) => window.dispatchEvent(e))
  })

  expect(cb.mock.calls.length).toBe(1)

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

test('useAllKeys All Up -> Down -> Up', () => {
  const keys = ['1', '2', ' ']

  const cb = jest.fn()

  const { result } = renderHook(() => useAllKeys(keys, cb))

  const keyDowns = keys.map((key) => createKeyDown(key))
  const keyUps = keys.map((key) => createKeyUp(key))

  expect(result.current).toBe(false)
  expect(cb.mock.calls.length).toBe(0)

  act(() => {
    keyDowns.forEach((e) => window.dispatchEvent(e))
  })

  expect(result.current).toBe(true)
  expect(cb.mock.calls.length).toBe(1)

  act(() => {
    keyUps.forEach((e) => window.dispatchEvent(e))
  })

  expect(result.current).toBe(false)
  expect(cb.mock.calls.length).toBe(1)
})
