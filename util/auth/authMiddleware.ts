import { NextApiRequest, NextApiResponse } from "next";
import { COOKIE, verifyAccessToken, verifyRefreshToken } from "@util/token";
import { AccessToken } from "@type/util/token";
import { notLoggedIn } from "@util/auth";

type AuthMiddleware = {
	accessToken: string;
	accessPayload: AccessToken | null;
	notLoggedIn: null | ((res: NextApiResponse) => void);
};

export default async function authMiddleware(
	req: NextApiRequest
): Promise<AuthMiddleware> {
	const accessToken = req.cookies[COOKIE.AccessToken];
	const accessPayload = await verifyAccessToken(accessToken);

	return accessPayload
		? { accessToken, accessPayload, notLoggedIn: null }
		: { accessToken, accessPayload, notLoggedIn };
}
