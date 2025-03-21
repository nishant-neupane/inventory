"use client";

import Image from "next/image";
import { useState } from "react";
import {useAuthCheck} from "../../../hooks/useAuthCheck.js";
import { toast } from "sonner";
import GoogleSignIn from "./google";
import { useRouter } from "next/navigation";
const SignUp = () => {
  useAuthCheck();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { name, email, password, confirmPassword } = formData;

    try {
      const response = await fetch("/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("User stored successfully");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          agree: false,
        });
        router.push("/login");
      } else {
        toast.error(result.error || "User Already Exists");
      }
    } catch (error) {
      toast.error("Error storing data");
      console.error("Error storing data:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 min-h-screen">
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-col sm:min-w-[500px] p-8 ">
          <p className="text-2xl font-semibold text-start">Get Started Now</p>
          <form className="flex flex-col pt-12 gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="rounded-lg border-2 border-gray-300 py-2 px-3"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="rounded-lg border-2 border-gray-300 py-2 px-3"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="rounded-lg border-2 border-gray-300 py-2 px-3"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="rounded-lg border-2 border-gray-300 py-2 px-3"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                checked={formData.agree}
                onChange={handleChange}
                required
              />
              <label htmlFor="agree">
                I agree to the{" "}
                <span className="underline">terms and policy</span>
              </label>
            </div>
            <button
              type="submit"
              className="bg-green-700 text-white py-2 px-4 rounded-lg w-full hover:bg-green-800"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center w-full pt-8">
            <div className="flex-grow border-t border-gray-400"></div>
            <p className="mx-4 text-sm">OR</p>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
        </div>
        <div className="pb-6">
          <p className="">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Login
            </a>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <GoogleSignIn />
          <div className="flex gap-2 border border-gray-400 rounded-lg py-2 px-3 cursor-pointer">
            <Image
              src="/facebook.svg"
              alt="Facebook Logo"
              width={24}
              height={24}
            />
            <p>Sign in with Facebook</p>
          </div>
        </div>
      </div>
      <div className="hidden xl:flex justify-end items-end">
        <Image
          src="/login.svg"
          height={1042}
          width={587}
          alt="Login Illustration "
          className="h-screen w-auto"
        />
      </div>
    </div>
  );
};

export default SignUp;
