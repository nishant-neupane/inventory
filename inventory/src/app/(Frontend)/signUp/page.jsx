import React from "react";
import SignUp from "./component/SignUp";
import { Toaster } from "sonner";

const page = () => {
  return (
    <div>
      <Toaster />
      <SignUp />
    </div>
  );
};

export default page;
