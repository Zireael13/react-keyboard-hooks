export const createKeyDown = (key: string): KeyboardEvent => {
  return new KeyboardEvent('keydown', { key })
}
export const createKeyUp = (key: string): KeyboardEvent => {
  return new KeyboardEvent('keyup', { key })
}
