import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useReducer,
} from "react";
import { iAppContext, tAppReducerAction } from "@type/context/App.d";
import { styleMedia } from "@util";
import { buildClientCookie } from "@util/token";
import api from "@api";

const AppState: iAppContext = {
	user: null,
	sidebar: { small: false, togglerRef: null },
	dispatch: (action: tAppReducerAction) => null,
};
const AppContext = createContext<iAppContext>(AppState);

function AppReducer(
	state: iAppContext,
	action: tAppReducerAction
): iAppContext {
	switch (action.type) {
		// auth
		case "LOGIN": {
			const { payload } = action;

			return { ...state, user: payload };
		}
		case "LOGOUT": {
			return { ...state, user: null };
		}
		// sidebar
		case "SET_SIDEBAR": {
			const { payload } = action;

			const sidebar = {
				...state.sidebar,
				small: payload,
			};
			return { ...state, sidebar };
		}
		case "TOOGLE_SIDEBAR": {
			const sidebar = {
				...state.sidebar,
				small: !state.sidebar.small,
			};
			return { ...state, sidebar };
		}
		case "SET_SIDEBAR_TOGGLER_REF": {
			const { payload } = action;
			const sidebar = {
				...state.sidebar,
				togglerRef: payload,
			};
			return { ...state, sidebar };
		}
		default: {
			return state;
		}
	}
}

function AppContextProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(AppReducer, AppState);

	const getUser = () => {
		(async () => {
			// user exists
			if (state.user) return;

			// client cookies exists
			const cookies = await buildClientCookie();
			if (!cookies.length) return;

			// request for get user
			const request = await api.getUser(cookies);
			if (request.status !== 200) return;

			// set user
			dispatch({ type: "LOGIN", payload: request.data.user });
		})();
	};
	const sidebarSize = () => {
		window.innerWidth <= styleMedia.md &&
			dispatch({ type: "SET_SIDEBAR", payload: true });
	};

	useEffect(() => {
		sidebarSize();
		getUser();
	}, []);

	return (
		<AppContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
}

function useAppContext(): iAppContext {
	return useContext(AppContext);
}

export { AppContext, AppContextProvider, useAppContext };
