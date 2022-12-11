import bcrypt from "bcrypt";

export async function createHash(data: string) {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(data, salt);
	return hash;
}

export async function compareHash(data: string, hash: string) {
	const result = await bcrypt.compare(data, hash);
	return result;
}
