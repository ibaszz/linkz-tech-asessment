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
import { Logo } from "@/components/Logo";

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
        className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
      >
        <div className="sticky absolute top-1 w-[calc(100vw-74px)] p-1 gap-2 bg-indigo-500 min-h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 z-10 flex flex-row justify-between">
          <div className="flex flex-row align-middle items-center gap-2">
            <Avatar src={session.user.image} width={5} height={5} />
            <h1>{session.user.name}</h1>
          </div>

          <div className="flex flex-row rounded-xl ">
            <button
              onClick={() => {
                router.replace("/login");
                logout();
              }}
              className="font-semibold py-2 px-5 rounded-lg hover:cursor-pointer border border-red-500 hover:opacity-10 transition-all duration-300 ease-in-out flex focus:shadow-outline focus:outline-none items-center mr-2"
            >
              <span className="text-sm">Logout</span>
            </button>
            <button
              onClick={() => {
                router.replace("/login");
                logout();
              }}
              className="font-semibold py-2 px-5 rounded-lg hover:cursor-pointer bg-red-500  hover:opacity-10 transition-all duration-300 ease-in-out flex focus:shadow-outline focus:outline-none items-center"
            >
              <span className="text-sm">Delete User</span>
            </button>
          </div>
        </div>
        {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="flex flex-col text-xs lg:text-sm flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto bg-none">
            Welcome Honored Member
            <code>{session?.user?.name}</code>
            <code>{session?.user?.email}</code>
          </div>
        </div> */}
        <h1 className="mt-5">Favorite Cats</h1>

        <CatCarousel
          datas={profile?.favorites.map(({ cat }) => ({
            url: cat.url,
            id: cat.id,
            isLiked: favorites?.includes(cat.id) || false,
          }))}
          like={(catId) => likeOrUnlike(catId, true)}
          unlike={(catId) => likeOrUnlike(catId, false)}
        />

        <div className="hidden lg:block relative animate-pulse flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]"></div>

        <div className="flex w-[calc(100vw-90px)] justify-start">
          <button
            onClick={() => callCats()}
            className="mt-2 font-semibold bg-indigo-500 text-gray-100 py-4 px-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex focus:shadow-outline focus:outline-none"
          >
            <span>Regenerate Cats</span>
          </button>
        </div>

        <CatCarousel
          datas={cats.map((cat) => ({
            url: cat.url,
            id: cat.id,
            isLiked: favorites?.includes(cat.id) || false,
          }))}
          like={(catId) => likeOrUnlike(catId, true)}
          unlike={(catId) => likeOrUnlike(catId, false)}
        />
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
