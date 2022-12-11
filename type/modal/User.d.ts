export default interface iUser {
	_id: string;
	name: string;
	email: string;
	password: string;
	image: string;
	createdAt: string;
}

export interface iUserLogin {
	email: string;
	password: string;
}
export interface iUserSignup extends iUserLogin {
	name: string;
}
