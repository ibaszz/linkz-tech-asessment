import Image from "next/image";
import { Inter } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@/components/Avatar";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useTimeout } from "usehooks-ts";
import { useRouterReady } from "@/hooks/useRouterReady";
import { useRouter } from "next/router";
import Signin from "./sainin";
import { useCats, useLikeOrUnlike, useProfile } from "@/utils/api/auth";
import { CatCarousel } from "@/components/CatCarousel";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { logout, user } = useUserContext();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isReady } = useRouterReady();
  const [profile, setProfile] = useState<ProfileResponse>();
  const [favorites, setFavorites] = useState<string[]>();
  const [cats, setCats] = useState<Cat[]>([]);

  const { call: callProfile, isLoading } = useProfile({
    onSuccess: (data) => {
      setProfile(data);
      setFavorites(data.favorites.map((r) => r.cat.id));
    },

    onError: (err) => {
      console.log(err);
    },
  });

  const { call: callCats, isLoading: isLoadingCats } = useCats({
    onSuccess: (data) => {
      setCats(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { call: likeOrUnlike } = useLikeOrUnlike({
    onSuccess: () => {
      callProfile();
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    }

    if (status === "authenticated" && user?.accessToken) {
      callProfile();
      callCats();
    }
  }, [status, user]);

  useEffect(() => {
    console.log("component did mount", status);
    if (status === "unauthenticated") {
      router.replace("/notmember");
    }
  });

  if (isReady && status === "authenticated" && session) {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="flex flex-col text-xs lg:text-sm flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto bg-none">
            Welcome Honored Member
            <code>{session?.user?.name}</code>
            <code>{session?.user?.email}</code>
          </div>
        </div>

        <div className="hidden lg:block relative animate-pulse flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]"></div>

        <CatCarousel
          datas={cats.map((cat) => ({
            url: cat.url,
            id: cat.id,
            isLiked: favorites?.includes(cat.id) || false,
          }))}
          like={(catId) => likeOrUnlike(catId, true)}
          unlike={(catId) => likeOrUnlike(catId, false)}
        />

        <div className="flex justify-between gap-1 mt-4 mb-16 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <div
            onClick={() => {
              router.replace("/login");
              logout();
            }}
            className="group hover:cursor-pointer rounded-lg border border-transparent px-2 py-1 lg:px-5 lg:py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-red-700 hover:dark:bg-red-800/30"
            rel="noopener noreferrer"
          >
            <h2
              className={`mb-3 text-sm lg:text-2xl font-semibold text-right sm:min-h-10 content-center`}
            >
              <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
                &lt;-
              </span>{" "}
              Delete User
            </h2>
            <p
              className={`m-0 max-w-[30ch] text-xs lg:text-sm opacity-50 text-right `}
            >
              Delete this user, You wont be able to login anymore
            </p>
          </div>
          <div
            onClick={() => {
              router.replace("/login");
              logout();
            }}
            className="group hover:cursor-pointer rounded-lg border border-transparent px-2 py-1 lg:px-5 lg:py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-red-700 hover:dark:bg-red-800/30"
            rel="noopener noreferrer"
          >
            <h2
              className={`mb-3 text-sm lg:text-2xl font-semibold sm:min-h-10 content-center text-left`}
            >
              Logout{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p
              className={`m-0 max-w-[30ch] text-xs lg:text-sm text-left opacity-50`}
            >
              Logging out from this awesome website
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div className="flex min-h-screen flex-col items-center">
          <h1 className={`text-3xl text-white`}>Goodbye...</h1>
        </div>
      </main>
    );
  }
}
