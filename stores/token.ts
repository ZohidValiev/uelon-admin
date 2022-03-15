
let _accessToken: string | null = null
let _refreshToken: string | null = null

export const tokenStore = {
    setToken(accessToken: string, refreshToken: string): void {
        _accessToken = accessToken
        _refreshToken = refreshToken
    },
    getAccessToken(): string | null {
        return _accessToken
    },
    hasAccessToken(): boolean {
        return _accessToken !== null
    },
    getRefreshToken(): string | null {
        return _refreshToken
    }
} as const
