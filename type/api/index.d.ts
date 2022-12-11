import { iToken } from "@type/util/token";
import { iNote, iTrash, iUser } from "@type/modal";

// auth
export interface iAuthLogin extends iToken {
	user: iUser;
}

// note
export interface iCreateNote {
	note: iNote;
}
export interface iGetNotes {
	notes: iNote[];
}

// trash
export interface iGetTrashes {
	trashes: iTrasg[];
}

// user
export interface iGetUser {
	user: iUser;
}
