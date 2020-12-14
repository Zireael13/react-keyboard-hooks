import { useKey } from '../useKey'
import { renderHook, act } from '@testing-library/react-hooks'
import { createKeyDown, createKeyUp } from './utils'

test('useKey Default (Up)', () => {
  const key = '1'

  const { result } = renderHook(() => useKey(key))

  expect(result.current).toBe(false)
})
test('useKey Down', () => {
  const key = '1'

  const { result } = renderHook(() => useKey(key))

  const keyDown = createKeyDown(key)

  act(() => {
    window.dispatchEvent(keyDown)
  })

  expect(result.current).toBe(true)
})
test('useKey Up -> Down -> Up', () => {
  const key = '1'

  const { result } = renderHook(() => useKey(key))

  const keyDown = createKeyDown(key)
  const keyUp = createKeyUp(key)

  act(() => {
    window.dispatchEvent(keyDown)
  })

  expect(result.current).toBe(true)

  act(() => {
    window.dispatchEvent(keyUp)
  })

  expect(result.current).toBe(false)
})
test('useKey Up -> Down -> Up', () => {
  const key = 'Enter'

  const { result } = renderHook(() => useKey(key))

  const keyDown = createKeyDown(key)
  const keyUp = createKeyUp(key)

  act(() => {
    window.dispatchEvent(keyDown)
  })

  expect(result.current).toBe(true)

  act(() => {
    window.dispatchEvent(keyUp)
  })

  expect(result.current).toBe(false)
})

const cases = [['Enter'], ['Escape'], ['a'], ['A'], [' ']]

test.each(cases)(`useKey(%s)`, (key) => {
  const { result } = renderHook(() => useKey(key))

  const keyDown = createKeyDown(key)
  const keyUp = createKeyUp(key)

  act(() => {
    window.dispatchEvent(keyDown)
  })

  expect(result.current).toBe(true)

  act(() => {
    window.dispatchEvent(keyUp)
  })

  expect(result.current).toBe(false)
})

test('useKey Down Callback', () => {
  const cb = jest.fn()
  const key = '1'

  const { result } = renderHook(() => useKey(key, cb))

  const keyDown = createKeyDown(key)

  act(() => {
    window.dispatchEvent(keyDown)
  })

  expect(result.current).toBe(true)
  expect(cb.mock.calls.length).toBe(1)
})

test('useKey Down Up Repeatedly Callback', () => {
  const cb = jest.fn()
  const key = '1'

  const { result } = renderHook(() => useKey(key, cb))

  const keyDown = createKeyDown(key)
  const keyUp = createKeyUp(key)

  act(() => {
    window.dispatchEvent(keyDown)
    window.dispatchEvent(keyUp)

    window.dispatchEvent(keyDown)
    window.dispatchEvent(keyUp)

    window.dispatchEvent(keyDown)
    window.dispatchEvent(keyUp)

    window.dispatchEvent(keyDown)
    window.dispatchEvent(keyUp)
  })

  expect(result.current).toBe(false)
  expect(cb.mock.calls.length).toBe(4)
})
