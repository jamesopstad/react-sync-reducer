import { createContext, useContext, useState } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import { Store } from './store';
import type { State, Action, Reducer } from './types';

export function createReducer<TState extends State, TAction extends Action>(
	reducer: Reducer<TState, TAction>
) {
	const StoreContext = createContext({} as Store<TState, TAction>);

	const ReducerProvider = (props: { initialState: TState; children?: any }) => {
		const [store] = useState(() => new Store(reducer, props.initialState));

		return (
			<StoreContext.Provider value={store}>
				{props.children}
			</StoreContext.Provider>
		);
	};

	const useDispatch = () => {
		const store = useContext(StoreContext);

		return store.dispatch;
	};

	const useSelector = <TSelected extends unknown>(
		selector: (state: TState) => TSelected
	) => {
		const store = useContext(StoreContext);
		const state = useSyncExternalStoreWithSelector(
			store.subscribe,
			store.getSnapshot,
			store.getSnapshot,
			selector
		);

		return state;
	};

	return { ReducerProvider, useDispatch, useSelector };
}
