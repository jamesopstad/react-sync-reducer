# React Sync Reducer

A library for creating reducers that can be efficiently accessed via context. Type-safe and compatible with Concurrent React.

## Motivation

In React applications, managing state by combining `useReducer` and `useContext` can sometimes lead to performance issues. This is because each context-consuming component is re-rendered whenever the context value changes. React Sync Reducer can be used to solve this issue.

## Installation

```sh
npm install react-sync-reducer
```

## Documentation

### Call the `createReducer` function outside of your React components

```tsx
import { createReducer } from 'react-sync-reducer';
import type { Action } from 'react-sync-reducer';

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

### Wrap your child components with the returned `Reducer` component and provide the initial state

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

### Use the returned `useDispatch` and `useSelector` hooks in your child components

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
