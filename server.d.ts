export type BearerToken = `Bearer ${string}`
// export type numberString = `${number}`

// export type stringSpace2 = `${string} ${string}`
// export type stringSpace3 = `${string} ${string} ${string}`

export interface Oauth2TokenResponse {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    token_type: 'Bearer' | string
}

export interface DiscordMeResponse {
    id: string,
    username: string,
    avatar: string,
    discriminator: string,
    public_flags: number,
    flags: number,
    banner: any,
    banner_color: any,
    accent_color: any,
    locale: 'fr' | string,
    mfa_enabled: boolean,
    email: string,
    verified: boolean
}
