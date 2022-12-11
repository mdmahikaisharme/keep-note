import { NextApiRequest, NextApiResponse } from "next";
import { Note } from "@model";
import { iNote } from "@type/modal";
import { connection } from "@util";
import { authMiddleware } from "@util/auth";

export default async function createNote(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connection();

	if (req.method === "POST") {
		try {
			// auth
			const { accessPayload, notLoggedIn } = await authMiddleware(req);
			if (notLoggedIn) return notLoggedIn(res);

			// data
			const data = {
				...req.body,
				userId: accessPayload?.userId,
				createdAt: new Date().toISOString(),
			};

			// note
			const note = await new Note(data).save();

			return res.status(200).json({ note });
		} catch (error) {
			console.log(`SERVER_ERROR: FAILED TO CREATE NOTE.`);
			return res.status(400).json(`SERVER_ERROR: FAILED TO CREATE NOTE.`);
		}
	}

	res.status(400).json("There is no response for this request.");
}
