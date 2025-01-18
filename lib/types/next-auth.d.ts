import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
  }

  interface JWT {
    [key: string]: unknown;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    provider?: string;
    error?: string;
  }

  interface Account {
    expires_in: number;
    access_token: string;
    refresh_token: string;
    provider: string;
  }

  interface Token extends JWT {
    [key: string]: unknown;
    provider?: string;
    refreshToken?: string;
    accessToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}
