import { NextApiRequest, NextApiResponse } from "next";
import { connection } from "@util";
import { clearToken } from "@util/token";

export default async function logout(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connection();

	if (req.method === "POST") {
		try {
			// token
			await clearToken(res);

			return res.status(200).json({ message: "LOGOUT!" });
		} catch (error) {
			console.log(`SERVER_ERROR: FAILED TO LOGOUT.`);
			return res.status(400).json(`SERVER_ERROR: FAILED TO LOGOUT.`);
		}
	}

	res.status(400).json("There is no response for this request.");
}
