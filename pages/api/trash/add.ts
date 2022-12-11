import { NextApiRequest, NextApiResponse } from "next";
import { Trash } from "@model";
import { iTrash } from "@type/modal";
import { connection } from "@util";

export default async function addTrash(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connection();

	if (req.method === "POST") {
		try {
			const { body } = req;

			// trash
			const trash = await new Trash(body).save();

			return res.status(200).json({ message: "Trash added." });
		} catch (error) {
			console.log(`SERVER_ERROR: FAILED TO ADD TO TRASH.`);
			return res
				.status(400)
				.json(`SERVER_ERROR: FAILED TO ADD TO TRASH.`);
		}
	}

	res.status(400).json("There is no response for this request.");
}
