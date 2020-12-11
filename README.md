<p align="center">
  <img src="/keyboard.png" alt="react-keyboard-image"/>
</p>

# react-keyboard-hooks

React Hooks for keyboard inputs with Typescript

There is a ton of packages that do something very similar, but aren't up to date for today's Typescript & Server-Side Rendering world.

Use these hooks if you want an easy way to add keyboard inputs to your application.

## Features

- Written in Typescript
- Works with SSR (ex. Next.js) with no additional configuration
- Simple boolean for single key
- Logic hooks for multiple keys (useAndKeys, useOrKeys)
- Multi-key objects for more complicated uses (useKeys)
- React Hooks API
- Dead simple usage. Just pass in single key or array of keys as strings
- Well tested with [Jest](https://jestjs.io/) & the [React Hooks Testing Library](https://github.com/testing-library/react-hooks-testing-library)

Compatible with React 16 and newer.

## Installation

To install the package (assuming you have React installed already):

```sh
npm install react-keyboard-hooks
# or
yarn install react-keyboard-hooks
```

## Usage

### Parameters

Look up key names on [the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). That is the only parameter you need!

Note: regular unicode keys (ex. the alphabet) are the exact same, even though they aren't listed on the MDN docs.

### useKey

```typescript
const isKeyDown = useKey('Enter')
```

the useKey hook takes a key value as a string, and returns a boolean if the key is currently pressed/down or not.

Example:

```typescript
import React from 'react'
import { useKey } from 'react-keyboard-hooks'

const Example: React.FC = () => {
  const isKeyDown = useKey('Enter')

  if (isKeyDown) {
    console.log('key is down')
  }

  if (!isKeyDown) {
    console.log('key is up')
  }

  return <div>{isKeyDown ? 'down' : 'up'}</div>
}
```

### useAnyKeys

```typescript
const isAnyKeyDown = useAnyKeys(['Enter', 'Tab', 'y'])
```

the useAnyKeys hook takes an array of key values (as strings) and returns true if **any** of the keys are currently pressed.

Example:

```typescript
import React from 'react'
import { useKeys } from 'react-keyboard-hooks'

const Example: React.FC = () => {
  const isAnyKeyDown = useAnyKeys(['Enter', 'Tab', 'y'])

  if (isAnyKeyDown) {
    console.log('at least one key is down')
  }

  if (!isAnyKeyDown) {
    console.log('all keys are up')
  }

  return <div>{isAnyKeyDown ? 'down' : 'up'}</div>
}
```

### useAllKeys

```typescript
const allKeyDown = useAllKeys(['Enter', 'Tab', 'y'])
```

the useAllKeys hook takes an array of key values (as strings) and returns true if **all** of the keys are currently pressed.

Example:

```typescript
import React from 'react'
import { useKeys } from 'react-keyboard-hooks'

const Example: React.FC = () => {
  const allKeysDown = useAllKeys(['Enter', 'Tab', 'y'])

  if (allKeysDown) {
    console.log('all keys are down')
  }

  if (!allKeysDown) {
    console.log('at least one key is up')
  }

  return <div>{allKeysDown ? 'down' : 'up'}</div>
}
```

### useKeys

```typescript
const keys = useKeys(['Enter', 'Tab', 'y'])
```

the useKeys hook takes an array of key values (as strings) and returns an object with each key as the key (heh) and the current down/up value as a boolean.

Useful if you want more complicated logic with keypresses, or if you want to use a lot of keys at once (as useKey makes an event listener for each hook)

Example:

```typescript
import React from 'react'
import { useKeys } from 'react-keyboard-hooks'

const Example: React.FC = () => {
  const keys = useKeys(['Enter', 'Tab', 'y'])

  if (keys['Enter']) {
    console.log('Enter key is pressed')
  }

  if (keys['Tab']) {
    console.log('Tab key is pressed')
  }

  return <div>{keys.y ? 'y is down' : 'y is up'}</div>
}
```
