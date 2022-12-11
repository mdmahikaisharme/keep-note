import axios, { AxiosResponse } from "axios";
import { iUserLogin, iUserSignup } from "@type/modal/User";
import {
	iAuthLogin,
	iCreateNote,
	iGetNotes,
	iGetTrashes,
	iGetUser,
} from "@type/api";
import { iNote, iTrash } from "@type/modal";
import { iToken } from "@type/util/token";

// env
// const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const API_URL = "http://127.1.0.0:3000/api";

// server
const server = axios.create({
	baseURL: API_URL,
});

// auth
async function signup(user: iUserSignup): Promise<AxiosResponse<iAuthLogin>> {
	const request = await server.post<iAuthLogin>(`/auth/signup`, user, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return request;
}
async function login(user: iUserLogin): Promise<AxiosResponse<iAuthLogin>> {
	const request = await server.post<iAuthLogin>(`/auth/login`, user, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return request;
}
async function logout() {
	const request = await server.post(`/auth/logout`, null, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return request;
}
async function refresh(cookies: string): Promise<AxiosResponse<iToken>> {
	const request = await server.post<iToken>(`/auth/refresh`, null, {
		headers: {
			"Content-Type": "application/json",
			Cookie: cookies,
		},
	});

	return request;
}

// note
async function createNote(
	cookies: string,
	note: iNote
): Promise<AxiosResponse<iCreateNote>> {
	const request = await server.post<iCreateNote>(`/note/create`, note, {
		headers: {
			"Content-Type": "application/json",
			Cookie: cookies,
		},
	});

	return request;
}
async function editNote(
	cookies: string,
	note: iNote
): Promise<AxiosResponse<iCreateNote>> {
	const request = await server.post<iCreateNote>(`/note/edit`, note, {
		headers: {
			"Content-Type": "application/json",
			Cookie: cookies,
		},
	});

	return request;
}
async function removeNote(cookies: string, note: iNote) {
	const request = await server.post(`/note/remove`, note, {
		headers: {
			"Content-Type": "application/json",
			Cookie: cookies,
		},
	});

	return request;
}
async function getUserNotes(
	cookies: string
): Promise<AxiosResponse<iGetNotes>> {
	const request = await server.get<iGetNotes>(`/user/note`, {
		headers: {
			"Content-Type": "application/json",
			Cookie: cookies,
		},
	});

	return request;
}

// trash
async function addTrash(cookies: string, note: iNote) {
	const request = await server.post(`/trash/add`, note, {
		headers: {
			"Content-Type": "application/json",
			Cookie: cookies,
		},
	});

	return request;
}
async function removeTrash(cookies: string, trash: iTrash) {
	const request = await server.post(`/trash/remove`, trash, {
		headers: {
			"Content-Type": "application/json",
			Cookie: cookies,
		},
	});

	return request;
}
async function restoreTrash(cookies: string, trash: iTrash) {
	const request = await server.post(`/trash/restore`, trash, {
		headers: {
			"Content-Type": "application/json",
			Cookie: cookies,
		},
	});

	return request;
}
async function getUserTrashes(
	cookies: string
): Promise<AxiosResponse<iGetTrashes>> {
	const request = await server.get<iGetTrashes>(`/user/trash`, {
		headers: {
			"Content-Type": "application/json",
			Cookie: cookies,
		},
	});

	return request;
}

// user
async function getUser(cookies: string): Promise<AxiosResponse<iGetUser>> {
	const request = await server.get<iGetUser>(`/user`, {
		headers: {
			"Content-Type": "application/json",
			Cookie: cookies,
		},
	});

	return request;
}

export default {
	// auth
	signup,
	login,
	logout,
	refresh,
	// note
	createNote,
	editNote,
	removeNote,
	getUserNotes,
	// trash
	addTrash,
	removeTrash,
	restoreTrash,
	getUserTrashes,
	// user
	getUser,
};
