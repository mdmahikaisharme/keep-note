import { NextApiResponse } from "next";

export default function notLoggedIn(res: NextApiResponse) {
	return res.status(401).json("You are not logged in.");
}
