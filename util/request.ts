import axios, { AxiosResponse } from "axios";
import { IncomingMessage, request, ServerResponse } from "http";

export type QueryRespone<T> = { error: string | null; data: T | null };

export async function fetcher<T>(url: string): Promise<QueryRespone<T>> {
	try {
		const request = async () => await axios.get(url);
		const { data } = await handleFetcher(request);

		return { error: null, data };
	} catch (error: any) {
		return { error: error.message as string, data: null };
	}
}

async function handleFetcher(request: () => Promise<AxiosResponse>) {
	try {
		return await request();
	} catch (error: any) {
		if (error?.response?.status === 401) {
			await refreshToken();
			return await request();
		}

		throw new Error("Failed handleFetcher");
	}
}

async function refreshToken() {
	return await axios.post("/api/auth/refresh", undefined);
}

export async function fetcherSSR<T>(
	req: IncomingMessage,
	res: ServerResponse,
	url: string
): Promise<QueryRespone<T>> {
	try {
		const request = async () =>
			await axios.get(url, {
				headers: { cookie: req.headers.cookie as any },
			});
		const { data } = await handleFetcherSSR(req, res, request);

		return { error: null, data };
	} catch (error: any) {
		return { error: error.message as string, data: null };
	}
}

async function handleFetcherSSR(
	req: IncomingMessage,
	res: ServerResponse,
	request: () => Promise<AxiosResponse>
) {
	try {
		return await request();
	} catch (error: any) {
		if (error?.response?.status === 401) {
			await refreshTokenSSR(req, res);
			return await request();
		}

		throw new Error("Failed handleFetcher");
	}
}

async function refreshTokenSSR(req: IncomingMessage, res: ServerResponse) {
	try {
		const response = await axios.post(
			"/api/auth/refresh",
			{},
			{
				headers: { cookie: req.headers.cookie as any },
			}
		);

		const cookies = response.headers.cookie;

		req.headers.cookie = cookies;
		res.setHeader("Set-Cookie", cookies);
	} catch (error) {
		throw new Error("Failed handleFetcherSSR");
	}
}
