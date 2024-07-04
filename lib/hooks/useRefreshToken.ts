"use client";

import axios from "lib/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {

    const res = await axios.post(
      '/api/token/',
      {
        username: session?.user?.user?.username,
        password: session?.user?.password,
      }
      
    );
    if (session) {
      session.user.tokens.access_token = res.data.access
      session.user.tokens.refresh_token = res.data.refresh
    }
    else signIn();
  };
  return refreshToken;
};
