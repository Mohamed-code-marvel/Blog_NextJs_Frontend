import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      password: string;
      tokens: {
        access_token: string;
        refresh_token: string;
      };
      user: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        is_active: boolean;
      };
      iat: number;
      exp: number;
      jti: string;
    };
  }
}
