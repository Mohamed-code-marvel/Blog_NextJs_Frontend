"use client";

import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";

import Login from "../../components/Login";
import Register from "../../components/Register";
import Wrapper from "../../components/Wrapper";
import { useSession } from "next-auth/react";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="w-full pt-8 flex justify-center items-center min-h-dvh bg-gray-50">
      <Wrapper>
        <div className="bg-white p-8 rounded-lg ">
          <h2 className="text-2xl font-bold text-center text-green-600">
            You are already logged in {session?.user?.user?.username}
          </h2>
        </div>
      </Wrapper>
    </div>
    );
  }

  return (
    <div className="w-full pt-8">
      <Wrapper>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Card className="w-full max-w-md">
            <CardHeader className="flex justify-center gap-y-4">
              <button
                onClick={() => setIsLogin(true)}
                className={
                  isLogin
                    ? "bg-slate-900 mx-2 text-white py-2 px-4 rounded"
                    : "bg-slate-100 black py-2 px-4 rounded mx-2"
                }
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={
                  !isLogin
                    ? "bg-slate-900 mx-2 text-white py-2 px-4 rounded"
                    : "bg-slate-100 black py-2 px-4 rounded mx-2"
                }
              >
                Register
              </button>
            </CardHeader>
            <CardContent>
              <div className="w-full md:min-w-[400px] h-auto min-h-[400px]">
                {isLogin ? <Login /> : <Register />}
              </div>
            </CardContent>
          </Card>
        </div>
      </Wrapper>
    </div>
  );
};

export default AuthPage;
