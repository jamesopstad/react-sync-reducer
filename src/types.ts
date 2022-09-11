export type State = any;

export type Action<TType extends string = string, TPayload = never> = [
	TPayload
] extends [never]
	? { type: TType }
	: { type: TType; payload: TPayload };

export type Reducer<TState extends State, TAction extends Action> = (
	state: TState,
	action: TAction
) => TState;
