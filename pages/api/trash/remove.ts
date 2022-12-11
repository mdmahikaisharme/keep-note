import { NextApiRequest, NextApiResponse } from "next";
import { Trash } from "@model";
import { iTrash } from "@type/modal";
import { connection } from "@util";

export default async function removeTrash(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connection();

	if (req.method === "POST") {
		try {
			const { body } = req;

			// trash
			const trash = await Trash.findByIdAndRemove(body._id);

			return res.status(200).json({ message: "Trash removed." });
		} catch (error) {
			console.log(`SERVER_ERROR: FAILED TO REMOVE FROM TRASH.`);
			return res
				.status(400)
				.json(`SERVER_ERROR: FAILED TO REMOVE FROM TRASH.`);
		}
	}

	res.status(400).json("There is no response for this request.");
}
