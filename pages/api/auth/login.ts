import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@model";
import { connection } from "@util";
import { buildToken, setToken } from "@util/token";
import { compareHash } from "@util/hash";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
	await connection();

	if (req.method === "POST") {
		try {
			const { body } = req;
			const findUser = await User.findOne({ email: body.email });
			if (!findUser) {
				return res.status(400).json(`User is not found.`);
			}

			// user
			const { password, ...user } = findUser._doc;

			// password
			const matchedPassword = await compareHash(body.password, password);
			if (!matchedPassword) {
				return res.status(400).json(`Password is not matched.`);
			}

			// token
			const { accessToken, refreshToken } = await buildToken(user);
			await setToken(res, accessToken, refreshToken);

			return res.status(200).json({ user, accessToken, refreshToken });
		} catch (error) {
			console.log(`SERVER_ERROR: FAILED TO LOGIN.`);
			return res.status(400).json(`SERVER_ERROR: FAILED TO LOGIN.`);
		}
	}

	res.status(400).json("There is no response for this request.");
}
