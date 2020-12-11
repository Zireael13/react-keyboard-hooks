import { useKey, useKeys } from '../index'
import { renderHook, act } from '@testing-library/react-hooks'

const createKeyDown = (key: string): KeyboardEvent => {
  return new KeyboardEvent('keydown', { key })
}
const createKeyUp = (key: string): KeyboardEvent => {
  return new KeyboardEvent('keyup', { key })
}

test('useKey Default (Up)', () => {
  const key = '1'

  const { result } = renderHook(() => useKey(key))

  expect(result.current.keyStatus).toBe('up')
})

test('useKey Down', () => {
  const key = '1'

  const { result } = renderHook(() => useKey(key))

  const keyDown = createKeyDown(key)

  act(() => {
    window.dispatchEvent(keyDown)
  })

  expect(result.current.keyStatus).toBe('down')
})

test('useKey Down then Up', () => {
  const key = '1'

  const { result } = renderHook(() => useKey(key))

  const keyDown = createKeyDown(key)
  const keyUp = createKeyUp(key)

  act(() => {
    window.dispatchEvent(keyDown)
  })

  expect(result.current.keyStatus).toBe('down')

  act(() => {
    window.dispatchEvent(keyUp)
  })

  expect(result.current.keyStatus).toBe('up')
})

test('useKey Down then Up', () => {
  const key = 'Enter'

  const { result } = renderHook(() => useKey(key))

  const keyDown = createKeyDown(key)
  const keyUp = createKeyUp(key)

  act(() => {
    window.dispatchEvent(keyDown)
  })

  expect(result.current.keyStatus).toBe('down')

  act(() => {
    window.dispatchEvent(keyUp)
  })

  expect(result.current.keyStatus).toBe('up')
})

const cases = [['Enter'], ['Escape'], ['a'], ['A'], [' ']]

test.each(cases)(`useKey(%s)`, (key) => {
  const { result } = renderHook(() => useKey(key))

  const keyDown = createKeyDown(key)
  const keyUp = createKeyUp(key)

  act(() => {
    window.dispatchEvent(keyDown)
  })

  expect(result.current.keyStatus).toBe('down')

  act(() => {
    window.dispatchEvent(keyUp)
  })

  expect(result.current.keyStatus).toBe('up')
})

// tests for useKeys (array)

test('useKeys Down then Up', () => {
  const keys = ['1', '2']

  const { result } = renderHook(() => useKeys(keys))

  const keyDown = createKeyDown(keys[0])
  const keyUp = createKeyUp(keys[0])

  act(() => {
    window.dispatchEvent(keyDown)
  })

  expect(result.current.keyStatus).toBe('down')

  act(() => {
    window.dispatchEvent(keyUp)
  })

  expect(result.current.keyStatus).toBe('up')
})
