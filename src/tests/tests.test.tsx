import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { createReducer } from '../createReducer';
import type { Action } from '../types';

interface State {
	value: number;
}
type Actions = Action<'increment'> | Action<'setValue', number>;

const { ReducerProvider, useDispatch, useSelector } = createReducer(
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

	return <h1>{value}</h1>;
}

function prepare() {
	const { getByRole } = render(
		<ReducerProvider initialState={{ value: 0 }}>
			<DispatchComponent />
			<SelectorComponent />
		</ReducerProvider>
	);

	return {
		incrementButton: getByRole('button', { name: 'Increment' }),
		setValueButton: getByRole('button', { name: 'Set Value' }),
		getValue: () => getByRole('heading').textContent
	};
}

describe('Client-side rendered', () => {
	it('should render the initial state', () => {
		const { getValue } = prepare();
		expect(getValue()).toBe('0');
	});

	it('should update the state in response to an action', () => {
		const { incrementButton, getValue } = prepare();
		fireEvent.click(incrementButton);
		expect(getValue()).toBe('1');
	});

	it('should update the state in response to an action with a payload', () => {
		const { setValueButton, getValue } = prepare();
		fireEvent.click(setValueButton);
		expect(getValue()).toBe('99');
	});
});

describe('Server-side rendered', () => {
	const markup = renderToStaticMarkup(
		<ReducerProvider initialState={{ value: 33 }}>
			<SelectorComponent />
		</ReducerProvider>
	);

	it('should render the initial state', () => {
		expect(markup).toBe('<h1>33</h1>');
	});
});
