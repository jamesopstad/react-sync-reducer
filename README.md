# React Conducer

A simple and tiny library for creating reducers that can be efficiently accessed via context.

## Installation

```sh
npm install react-conducer
```

## Documentation

### Create the Reducer component and hooks outside of your React component

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

### Wrap your components with the Reducer and provide the initial state

```tsx
<Reducer initialState={{ value: 0 }}>
	<DispatchComponent />
	<SelectorComponent />
</Reducer>
```

### Use the useDispatch and useSelector hooks in your components

```tsx
function DispatchComponent() {
	const dispatch = useDispatch();

	return (
		<>
			<button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
			<button onClick={() => dispatch({ type: 'setValue', payload: 99 })}>
				Set Value
			</button>
		</>
	);
}

function SelectorComponent() {
	const value = useSelector((state) => state.value);

	return <h1>The current value is: {value}</h1>;
}
```
