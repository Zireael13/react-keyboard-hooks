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

Compatible with React 16.8 and newer.

Does not support Internet Explorer for certain special keys such as Escape. If someone wants to add a map for the old key values feel free to create a PR, but I don't think IE is worth the time anymore.

## Installation

To install the package (assuming you have React installed already):

```sh
npm install react-keyboard-hooks
# or
yarn add react-keyboard-hooks
```

## Usage

### Parameters

Look up key names on [the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). That is the only parameter you need!

Note: regular unicode keys (ex. the alphabet) are the exact same, even though they aren't listed on the MDN docs.

### useKey

```typescript
const isKeyDown = useKey('Enter')
# or
useKey('Enter', callbackFn)
# or both
const isKeyDown = useKey('Enter', callbackFn)
```

the useKey hook takes a key value as a string, and returns a boolean if the key is currently pressed/down or not.

Optionally you can use a callback function that runs on the key down instead.

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

Callback Example:

```typescript
import React, { useState } from 'react'
import { useKey } from 'react-keyboard-hooks'

const Example: React.FC = () => {
  const [keyPresses, setKeyPresses] = useState(0)

  const callbackFn = () => {
    console.log('key is down')
    setKeyPresses((previousPresses) => (previousPresses += 1))
  }

  useKey('Enter', callbackFn)

  return <div>{keyPresses}</div>
}
```

### useAnyKeys

```typescript
const isAnyKeyDown = useAnyKeys(['Enter', 'Tab', 'y'])
# or
useAnyKeys(['Enter', 'Tab', 'y'], callbackFn)
# or both
const isAnyKeyDown = useAnyKeys(['Enter', 'Tab', 'y'], callbackFn)
```

the useAnyKeys hook takes an array of key values (as strings) and returns true if **any** of the keys are currently pressed.

Optionally you can use a callback function that runs if any of the keys down instead.

Note: callback doesn't run multiple times if multiple keys are down at the **same time**.

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

Callback Example:

```typescript
import React, { useState } from 'react'
import { useAnyKeys } from 'react-keyboard-hooks'

const Example: React.FC = () => {
  const [keyPresses, setKeyPresses] = useState(0)

  const callbackFn = () => {
    console.log('at least one key is down')
    setKeyPresses((previousPresses) => (previousPresses += 1))
  }

  useAnyKeys(['Enter', 'Tab', 'y'], callbackFn)

  return <div>{keyPresses}</div>
}
```

### useAllKeys

```typescript
const allKeyDown = useAllKeys(['Enter', 'Tab', 'y'])
# or
useAllKeys(['Enter', 'Tab', 'y'], callbackFn)
# or both
const allKeyDown = useAllKeys(['Enter', 'Tab', 'y'], callbackFn)
```

the useAllKeys hook takes an array of key values (as strings) and returns true if **all** of the keys are currently pressed.

Optionally you can use a callback function that runs if all of the keys are down instead.

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

Callback Example:

```typescript
import React, { useState } from 'react'
import { useAllKeys } from 'react-keyboard-hooks'

const Example: React.FC = () => {
  const [keyPresses, setKeyPresses] = useState(0)

  const callbackFn = () => {
    console.log('all keys are down')
    setKeyPresses((previousPresses) => (previousPresses += 1))
  }

  useAllKeys(['Enter', 'Tab', 'y'], callbackFn)

  return <div>{keyPresses}</div>
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

  if (keys.Enter) {
    console.log('Enter key is pressed')
  }

  if (keys.Tab) {
    console.log('Tab key is pressed')
  }

  return <div>{keys.y ? 'y is down' : 'y is up'}</div>
}
```
