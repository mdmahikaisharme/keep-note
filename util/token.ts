import { GetServerSidePropsContext, NextApiResponse } from "next";
import cookie, { CookieSerializeOptions } from "cookie";
import jsCookie, { CookieAttributes } from "js-cookie";
import jwt from "jsonwebtoken";
import { iUser } from "@type/modal";
import {
	AccessToken,
	AccessTokenPayload,
	iToken,
	RefreshToken,
	RefreshTokenPayload,
} from "@type/util/token";

// env
const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY as string;
const REFRESH_KEY = process.env.NEXT_PUBLIC_REFRESH_KEY as string;
const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN as string;
const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";

export enum COOKIE {
	AccessToken = "access",
	RefreshToken = "refresh",
}
export enum TokenExpiration {
	Access = 60 * 60,
	Refresh = 60 * 60,
}

// token
const accessTokenOption = {
	expiresIn: TokenExpiration.Access,
};
const refreshTokenOption = {
	expiresIn: TokenExpiration.Refresh,
};

// cookie
const defaultCookieOption: CookieAttributes = {
	secure: isProduction,
	sameSite: isProduction ? "strict" : "lax",
	domain: BASE_DOMAIN,
	path: "/",
};

// server cookie
const serverCookieOption: CookieSerializeOptions = {
	...(defaultCookieOption as CookieSerializeOptions),
	httpOnly: true,
};
const accessTokenCookieOption: CookieSerializeOptions = {
	...serverCookieOption,
	maxAge: TokenExpiration.Access * 1000,
};
const refreshTokenCookieOption: CookieSerializeOptions = {
	...serverCookieOption,
	maxAge: TokenExpiration.Refresh * 1000,
};
const expiredCookieOption: CookieSerializeOptions = {
	...serverCookieOption,
	maxAge: 0,
};

export async function buildToken(user: iUser) {
	const accessPayload: AccessTokenPayload = {
		userId: user._id,
	};
	const refreshPayload: RefreshTokenPayload = {
		userId: user._id,
		createdAt: user.createdAt,
	};

	const accessToken = await signAccessToken(accessPayload);
	const refreshToken = await signRefreshToken(refreshPayload);

	return { accessToken, refreshToken };
}
export async function setToken(
	res: NextApiResponse,
	access: string,
	refresh: string
) {
	const accessCookie = cookie.serialize(
		COOKIE.AccessToken,
		access,
		accessTokenCookieOption
	);
	const refreshCookie = cookie.serialize(
		COOKIE.RefreshToken,
		refresh,
		refreshTokenCookieOption
	);

	res.setHeader("Set-Cookie", `${accessCookie}; ${refreshCookie};`);
}
export async function clearToken(res: NextApiResponse) {
	const accessCookie = cookie.serialize(
		COOKIE.AccessToken,
		"",
		expiredCookieOption
	);
	const refreshCookie = cookie.serialize(
		COOKIE.RefreshToken,
		"",
		expiredCookieOption
	);

	res.setHeader("Set-Cookie", `${accessCookie}; ${refreshCookie};`);
}

// sign
export async function signAccessToken(payload: AccessTokenPayload) {
	const accessToken = await jwt.sign(payload, ACCESS_KEY, accessTokenOption);
	return accessToken;
}
export async function signRefreshToken(payload: RefreshTokenPayload) {
	const refreshToken = await jwt.sign(
		payload,
		REFRESH_KEY,
		refreshTokenOption
	);
	return refreshToken;
}

// verify
export async function verifyAccessToken(token: string) {
	try {
		const accessToken = await jwt.verify(token, ACCESS_KEY);
		return accessToken as AccessToken;
	} catch {
		return null;
	}
}
export async function verifyRefreshToken(token: string) {
	try {
		const refreshToken = await jwt.verify(token, REFRESH_KEY);
		return refreshToken as RefreshToken;
	} catch {
		return null;
	}
}

// client
export async function setClientToken(access: string, refresh: string) {
	jsCookie.set(COOKIE.AccessToken, access);
	jsCookie.set(COOKIE.RefreshToken, refresh);
}
export async function getClientToken() {
	const accessToken = jsCookie.get(COOKIE.AccessToken) as string;
	const refreshToken = jsCookie.get(COOKIE.RefreshToken) as string;
	return { accessToken, refreshToken };
}
export async function clearClientToken() {
	jsCookie.set(COOKIE.AccessToken, "");
	jsCookie.set(COOKIE.RefreshToken, "");
}

// cookie
export async function buildClientCookie() {
	const { accessToken, refreshToken } = await getClientToken();

	const accessCookie = cookie.serialize(COOKIE.AccessToken, accessToken);
	const refreshCookie = cookie.serialize(COOKIE.RefreshToken, refreshToken);

	return `${accessCookie}; ${refreshCookie};`;
}

// cookie SSR
export async function buildCookieSSR(context: GetServerSidePropsContext) {
	const cookies = context.req.cookies;

	const accessCookie = cookie.serialize(
		COOKIE.AccessToken,
		cookies[COOKIE.AccessToken]
	);
	const refreshCookie = cookie.serialize(
		COOKIE.RefreshToken,
		cookies[COOKIE.RefreshToken]
	);

	return `${accessCookie}; ${refreshCookie};`;
}
export async function buildCookieRefreshSSR(token: iToken) {
	const { accessToken, refreshToken } = token;

	const accessCookie = cookie.serialize(COOKIE.AccessToken, accessToken);
	const refreshCookie = cookie.serialize(COOKIE.RefreshToken, refreshToken);

	return `${accessCookie}; ${refreshCookie};`;
}
