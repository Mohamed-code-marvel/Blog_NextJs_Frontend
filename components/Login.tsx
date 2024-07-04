"use client";
import { signIn } from "next-auth/react";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import TextBox from "@elements/TextBox";

const LoginPage = () => {
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <div className={"flex flex-col justify-center items-center h-auto gap-1"}>
      <div className="px-7 py-4 w-full shadow bg-white rounded-md flex flex-col gap-2">
        <TextBox
          lableText="User Name"
          onChange={(e) => (userName.current = e.target.value)}
        />
        <TextBox
          lableText="Password"
          type={"password"}
          onChange={(e) => (pass.current = e.target.value)}
        />
        <button
          onClick={onSubmit}
          type="submit"
          className="bg-slate-900 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
