import { NextApiRequest, NextApiResponse } from "next";
import { Note, Trash } from "@model";
import { iNote } from "@type/modal";
import { connection } from "@util";

export default async function removeNote(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connection();

	if (req.method === "POST") {
		try {
			const { body } = req;

			// note
			const note = await Note.findByIdAndRemove(body._id);

			// trash
			const trash = await new Trash(body).save();

			return res.status(200).json({ message: "Note removed." });
		} catch (error) {
			console.log(`SERVER_ERROR: FAILED TO REMOVE NOTE.`);
			return res.status(400).json(`SERVER_ERROR: FAILED TO REMOVE NOTE.`);
		}
	}

	res.status(400).json("There is no response for this request.");
}
