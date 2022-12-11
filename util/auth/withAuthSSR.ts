import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { buildCookieRefreshSSR, buildCookieSSR, COOKIE } from "@util/token";
import api from "@api";

export default function withAuthSSR(gssp: GetServerSideProps) {
	return async (context: GetServerSidePropsContext) => {
		const token = context.req.cookies;

		// access token
		if (token[COOKIE.AccessToken]) {
			return await gssp(context);
		}

		// refresh token
		if (token[COOKIE.RefreshToken]) {
			const cookies = await buildCookieSSR(context);
			const request = await api.refresh(cookies);

			if (request.status === 200) {
				const currentCookies = (await buildCookieRefreshSSR(
					request.data
				)) as any;
				context.req.cookies = currentCookies;
				context.res.setHeader("Set-Cookie", currentCookies);

				return {
					redirect: {
						destination: context.req.url,
					},
				};
			}
		}

		// login
		return {
			redirect: {
				destination: `/auth/login`,
			},
		};
	};
}
