export interface iToken {
	accessToken: string;
	refreshToken: string;
}
export interface AccessTokenPayload {
	userId: string;
}
export interface RefreshTokenPayload {
	userId: string;
	createdAt: string;
}
export interface TokenInfo {
	iat: number;
	exp: number;
}
export interface AccessToken extends AccessTokenPayload, TokenInfo {}
export interface RefreshToken extends RefreshTokenPayload, TokenInfo {}
