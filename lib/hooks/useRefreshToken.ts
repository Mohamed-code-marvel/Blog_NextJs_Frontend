"use client";

import axios from "lib/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();
  // console.log(JSON.stringify(session)+"-----------------------------------session--useRefreshToken------------------------------------")

  const refreshToken = async () => {
    // const res = await axios.post("/auth/token/", {
    //   refresh: session?.user.tokens.refresh_token,
    // });
    // const res = await axios.post("/auth/token/", {
    //   username: session?.user?.user?.username,
    //   password: session?.user?.password,
    // });
    const res = await axios.post(
      '/api/token/',
      {
        username: session?.user?.user?.username,
        password: session?.user?.password,
      }
      
    );
    // console.log(JSON.stringify(res)+"-----------------------------------res----useRefreshToken----------------------------------")
    // console.log(res.data+"-----------------------------------resdatadata----useRefreshToken----------------------------------")
    // console.log(res+"-----------------------------------res----useRefreshToken----------------------------------")

    if (session) {
      session.user.tokens.access_token = res.data.access
      session.user.tokens.refresh_token = res.data.refresh
    }
    else signIn();
  };
  return refreshToken;
};
