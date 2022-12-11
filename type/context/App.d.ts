export interface iAppContext {
	user: iUser | any;
	sidebar: {
		small: bollean;
		togglerRef: any;
	};
	dispatch: (action: tAppReducerAction) => any;
}

export type tAppReducerAction =
	// auth
	| { type: "LOGIN"; payload: iUser }
	| { type: "LOGOUT" }
	// sidebar
	| { type: "SET_SIDEBAR"; payload: boolean }
	| { type: "TOOGLE_SIDEBAR" }
	| { type: "SET_SIDEBAR_TOGGLER_REF"; payload: any };
