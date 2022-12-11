import { NextApiRequest, NextApiResponse } from "next";
import { Note, Trash } from "@model";
import { iTrash } from "@type/modal";
import { connection } from "@util";
import axios from "axios";

export default async function restoreTrash(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connection();

	if (req.method === "POST") {
		try {
			const { body } = req;

			// trash
			const trash = await Trash.findByIdAndRemove(body._id);

			// note
			const note = await new Note(body).save();

			return res.status(200).json({ message: "Trash restored." });
		} catch (error) {
			console.log(`SERVER_ERROR: FAILED TO REMOVE FROM TRASH.`);
			return res
				.status(400)
				.json(`SERVER_ERROR: FAILED TO REMOVE FROM TRASH.`);
		}
	}

	res.status(400).json("There is no response for this request.");
}
