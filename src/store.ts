import type { State, Action, Reducer } from './types';

export class Store<TState extends State, TAction extends Action> {
	private reducer: Reducer<TState, TAction>;
	private state: TState;
	private subscribers = new Set<() => void>();

	constructor(reducer: Reducer<TState, TAction>, initialState: TState) {
		this.reducer = reducer;
		this.state = initialState;
		this.dispatch = this.dispatch.bind(this);
		this.subscribe = this.subscribe.bind(this);
		this.getSnapshot = this.getSnapshot.bind(this);
	}

	dispatch(action: TAction) {
		this.state = this.reducer(this.state, action);
		this.subscribers.forEach((subscriber) => subscriber());
	}

	subscribe(callback: () => void) {
		this.subscribers.add(callback);

		return () => this.subscribers.delete(callback);
	}

	getSnapshot() {
		console.log('here')
		return this.state;
	}
}
