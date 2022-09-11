import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { createReducer } from '.';
import type { Action } from '.';

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

describe('createReducer', () => {
	const { getByRole } = render(
		<Reducer initialState={{ value: 0 }}>
			<DispatchComponent />
			<SelectorComponent />
		</Reducer>
	);

	const increment = getByRole('button', { name: 'Increment' });
	const setValue = getByRole('button', { name: 'Set Value' });
	const getValue = () => getByRole('heading').textContent;

	it('should render the initial state', () => {
		expect(getValue()).toBe('0');
	});

	it('should update the state in response to an action', () => {
		fireEvent.click(increment);
		expect(getValue()).toBe('1');
	});

	it('should update the state in response to an action with a payload', () => {
		fireEvent.click(setValue);
		expect(getValue()).toBe('99');
	});
});
