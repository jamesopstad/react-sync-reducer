# React Conducer

A simple and tiny library for creating reducers that can be efficiently accessed via context. Type-safe and concurrent-safe.

## Installation

```sh
npm install react-conducer
```

## Documentation

### Call the createReducer function outside of your React components

```tsx
import { createReducer } from 'react-conducer';
import type { Action } from 'react-conducer';

interface State {
  value: number;
}

type Actions = Action<'increment'> | Action<'setValue', number>;

const { Reducer, useDispatch, useSelector } = createReducer(
  (state: State, action: Actions) => {
    switch (action.type) {
      case 'increment': {
        return {
          ...state,
          value: state.value + 1
        };
      }
      case 'setValue': {
        return {
          ...state,
          value: action.payload
        };
      }
    }
  }
);
```

### Wrap your child components with the returned Reducer component and provide the initial state

```tsx
function Component() {
  return (
    <Reducer initialState={{ value: 0 }}>
      <DispatchComponent />
      <SelectorComponent />
    </Reducer>
  );
}
```

### Use the returned useDispatch and useSelector hooks in your child components

```tsx
function DispatchComponent() {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'setValue', payload: 99 })}>
        Set Value to 99
      </button>
    </>
  );
}

function SelectorComponent() {
  const value = useSelector((state) => state.value);

  return <p>The current value is: {value}</p>;
}
```
