import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
    user: {
      userId?: number;
      nickname?: string;
      email?: string | null;
    };
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

  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    userId?: number;
    nickname?: string;
  }

  interface Profile extends KakaoProfile {
    sub?: string; // Apple ID
    id?: string; // 추가
    email?: string;
    name?: string;
    image?: string;
  }
}

export interface AppleRequest {
  url?: string;
  method?: string;
  body?: {
    user?: string;
  };
}

export interface AppleUserInfo {
  name?: {
    firstName: string;
    lastName?: string;
  };
}
interface KakaoProfile {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile: {
      nickname: string;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
}
