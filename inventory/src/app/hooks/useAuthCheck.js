import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      router.push("/home"); 
    }
  }, [router]);
};