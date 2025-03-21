"use client";
import React, { use } from "react";
import { useProtectRoute } from "../../../hooks/useProtectRoute.js";

import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  useProtectRoute();
  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div>Dashboard</div>
      <div>
        <button
          onClick={() => {
            logout();
          }}
          className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded-md"
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
