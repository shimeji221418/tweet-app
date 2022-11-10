import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContest } from "../../provider/AuthProvider";

export const LoginUser = ({ children }) => {
  const router = useRouter();
  const { user } = useAuthContest();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, []);
  return children;
};
