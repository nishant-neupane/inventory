import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useProtectRoute = () => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    }
  }, [router]);
};
