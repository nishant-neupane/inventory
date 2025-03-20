"use client";

import Image from "next/image";
import { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
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
        setMessage("user stored successfully");
        // Reset form fields after successful submission
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          agree: false,
        });
      } else {
        setMessage(`Error: ${result.error || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage("Error storing data");
      console.error("Error storing data:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-[30vw]">
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
          {message && <p className="text-red-500 mt-4">{message}</p>}
        </div>
      </div>
      <div className="hidden xl:flex justify-end items-end">
        <Image
          src="/login.svg"
          height={1042}
          width={587}
          alt="Login Illustration"
        />
      </div>
    </div>
  );
};

export default Page;
