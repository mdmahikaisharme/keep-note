import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@model";
import { iUser } from "@type/modal";
import { connection } from "@util";
import { buildToken, setToken } from "@util/token";
import { createHash } from "@util/hash";

export default async function signup(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connection();

	if (req.method === "POST") {
		try {
			const { body } = req;
			const data: iUser = {
				...body,
				image: "",
				password: await createHash(body.password),
				createdAt: new Date().toISOString(),
			};

			// user
			const newUser = await new User(data).save();
			const { password, ...user } = newUser._doc;

			// token
			const { accessToken, refreshToken } = await buildToken(user);
			await setToken(res, accessToken, refreshToken);

			return res.status(200).json({ user, accessToken, refreshToken });
		} catch (error) {
			console.log(`SERVER_ERROR: FAILED TO CREATE USER.`);
			return res.status(400).json(`SERVER_ERROR: FAILED TO CREATE USER.`);
		}
	}

	res.status(400).json("There is no response for this request.");
}
