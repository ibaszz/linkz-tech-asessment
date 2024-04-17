import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useRouterReady = () => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsReady(router.isReady);
  }, [router.isReady]);

  return { isReady, router };
};
