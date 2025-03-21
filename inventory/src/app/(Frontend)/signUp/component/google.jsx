import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleSignIn = () => {
  return (
    <div
      className="flex gap-2 border border-gray-400 rounded-lg py-2 px-3 cursor-pointer"
      onClick={() => signIn("google")}
    >
      <Image src="/google.svg" alt="Google Logo" width={24} height={24} />
      <p>Sign in with Google</p>
    </div>
  );
};

export default GoogleSignIn;