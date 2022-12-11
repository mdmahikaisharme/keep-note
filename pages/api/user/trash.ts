import { NextApiRequest, NextApiResponse } from "next";
import { Trash } from "@model";
import { connection } from "@util";
import { authMiddleware } from "@util/auth";

export default async function getUserTrashes(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connection();

	if (req.method === "GET") {
		try {
			const { accessPayload, notLoggedIn } = await authMiddleware(req);
			if (notLoggedIn) return notLoggedIn(res);

			// trash
			const trashes = await Trash.find({ userId: accessPayload?.userId });

			return res.status(200).json({ trashes });
		} catch (error) {
			console.log(`SERVER_ERROR: FAILED TO GET USER NOTES.`);
			return res
				.status(400)
				.json(`SERVER_ERROR: FAILED TO GET USER NOTES.`);
		}
	}

	res.status(400).json("There is no response for this request.");
}
