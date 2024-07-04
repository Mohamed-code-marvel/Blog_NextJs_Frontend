"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Wrapper from "./Wrapper";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const url = `http://localhost:8000/api/register/`;
  // const url = `${process.env.API}/accounts/auth/register`

  // console.log(url);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Success Signup,Register")
        router.push("/login");
      } else {
        const errorData = await res.json();
        setError(errorData.detail || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full h-full">
      <Wrapper>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="username">username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <CardFooter className="w-full p-0">
                <button
                  type="submit"
                  className="bg-slate-900 text-white py-2 px-4 rounded w-full"
                >
                  Register
                </button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </Wrapper>
    </div>
  );
};

export default Register;
