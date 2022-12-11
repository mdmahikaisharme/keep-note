import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@model";
import { connection } from "@util";
import { buildToken, COOKIE, setToken, verifyRefreshToken } from "@util/token";
import { notLoggedIn } from "@util/auth";

export default async function refresh(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connection();

	if (req.method === "POST") {
		try {
			// refresh token
			const refreshPayload = await verifyRefreshToken(
				req.cookies[COOKIE.RefreshToken]
			);
			if (!refreshPayload) return notLoggedIn(res);

			// user
			const findUser = await User.findById(refreshPayload?.userId);
			const { password, ...user } = findUser._doc;

			// token
			const { accessToken, refreshToken } = await buildToken(user);
			await setToken(res, accessToken, refreshToken);

			return res.status(200).json({ accessToken, refreshToken });
		} catch (error) {
			console.log(`SERVER_ERROR: FAILED TO REFRESH.`);
			return res.status(400).json(`SERVER_ERROR: FAILED TO REFRESH.`);
		}
	}

	res.status(400).json("There is no response for this request.");
}
