export default function useNoEffectState<T>(initialState: T) {
	let state: T = initialState;

	const setState = (currentState: T) => {
		state = currentState;
	};

	return [state as T, setState as (currentState: T) => void];
}
