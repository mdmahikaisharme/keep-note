import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@model";
import { connection } from "@util";
import { authMiddleware } from "@util/auth";

export default async function getUser(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connection();

	if (req.method === "GET") {
		try {
			// auth
			const { accessPayload, notLoggedIn } = await authMiddleware(req);
			if (notLoggedIn) return notLoggedIn(res);

			// user
			const user = await User.findById(accessPayload?.userId);

			return res.status(200).json({ user });
		} catch (error) {
			console.log(`SERVER_ERROR: FAILED TO GET USER NOTES.`);
			return res
				.status(400)
				.json(`SERVER_ERROR: FAILED TO GET USER NOTES.`);
		}
	}

	res.status(400).json("There is no response for this request.");
}
