import { NextApiRequest, NextApiResponse } from "next";
import { Note } from "@model";
import { iNote } from "@type/modal";
import { connection } from "@util";

export default async function editNote(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connection();

	if (req.method === "POST") {
		try {
			const { body } = req;

			// note
			const note = await Note.findByIdAndUpdate(body._id, body);

			return res.status(200).json({ note });
		} catch (error) {
			console.log(`SERVER_ERROR: FAILED TO EDIT NOTE.`);
			return res.status(400).json(`SERVER_ERROR: FAILED TO EDIT NOTE.`);
		}
	}

	res.status(400).json("There is no response for this request.");
}
