# react-keyboard-input

Simple react hooks for keyboard inputs with Typescript

There is already like 100 packages that do the same thing but none were written in Typescript and include SSR support out of the box. So here you go!

## Features

- Written in Typescript
- Works with SSR (ex. Next.js) with no additional configuration
- New React Hooks API
- Simple usage, only need to pass in a key value
- Track multiple different keys with the same hook (useKeys)

Compatible with React 16.8 and newer.

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
const { keyStatus } = useKey('Enter')
```

the useKey hook takes a key value as a string, and returns a variable keyStatus that changes if the key is pressed or not.

Example:

```typescriptjsx
import React from 'react'
import { useKey } from 'react-keyboard-hooks'

const Example: React.FC = () => {
  const { keyStatus } = useKey(' ')

  if(keyStatus === 'down') {
      console.log('key is down')
  }

  return <div>{keyStatus}</div>
}
```

### useKeys

```typescriptjsx
const { keyStatus } = useKeys(['Enter', 'Tab', 'y'])
```

the useKeys hook takes an array of key values (as strings) and returns if **any** of the keys are currently pressed.

Example:

```typescriptjsx
import React from 'react'
import { useKeys } from 'react-keyboard-hooks'

const Example: React.FC = () => {
  const { keyStatus } = useKeys(['Enter', 'Tab', 'y'])

  if(keyStatus === 'down') {
      console.log('one of the keys is down')
  }

  return <div>{keyStatus}</div>
}
```

If some people use this i'll add some more features like only returning down if all of the keys are pressed.
