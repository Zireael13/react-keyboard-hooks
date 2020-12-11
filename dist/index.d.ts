export declare type keyStatuses = 'up' | 'down'
export declare const useKey: (
  key: string
) => {
  keyStatus: keyStatuses
}
export declare const useKeys: (
  keys: string[]
) => {
  keyStatus: keyStatuses
}
