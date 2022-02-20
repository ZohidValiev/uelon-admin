
interface TokenStore {
    setAccessToken: (accessToken: string) => void
    getAccessToken: () => string
    hasAccessToken: () => boolean
}

let _accessToken: string | undefined

export const tokenStore: TokenStore = {
    setAccessToken(accessToken: string): void {
        _accessToken = accessToken
    },
    getAccessToken(): string {
        return _accessToken
    },
    hasAccessToken(): boolean {
        return _accessToken != undefined
    }
}