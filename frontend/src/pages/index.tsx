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
import {
  useCats,
  useDeleteProfile,
  useLikeOrUnlike,
  useProfile,
} from "@/utils/api/auth";
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
  const [isDelete, deleteUser] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

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

  const { call: deleteProfile } = useDeleteProfile({
    onSuccess: (data) => {
      setError("");
      setPassword("");
      deleteUser(false);
      logout();
    },
    onError: (err) => {
      setError(err);
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

  if (user && user.deleted) {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div className="flex min-h-screen flex-col items-center">
          <h1 className={`text-3xl text-white`}>
            User Already Deleted, Please contact Admin
          </h1>
          <button
            className="mt-2 p-2 px-4 bg-indigo-500 rounded-xl"
            onClick={() => {
              router.replace("/login");
            }}
          >
            Back to Login
          </button>
        </div>
      </main>
    );
  }

  if (isReady && status === "authenticated" && session) {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
      >
        <div className="sticky absolute top-1 w-[calc(100vw-74px)] p-2 gap-2 bg-indigo-500 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 z-10 flex flex-row justify-between">
          <div className="flex flex-row align-middle items-center gap-2">
            <Avatar src={session.user.image} width={1} height={1} />
            <h1 className="text-sm">{session.user.name}</h1>
          </div>

          <div className="flex flex-row rounded-xl ">
            <button
              onClick={() => {
                router.replace("/login");
                logout();
              }}
              className="font-semibold py-1 px-5 rounded-lg hover:cursor-pointer border border-red-500 hover:bg-red-500 transition-all duration-300 ease-in-out flex focus:shadow-outline focus:outline-none items-center mr-2"
            >
              <span className="text-sm">Logout</span>
            </button>
            <button
              onClick={() => {
                deleteUser(true);
              }}
              className="font-semibold py-2 px-5 rounded-lg hover:cursor-pointer border border-red-500 bg-red-500 hover:bg-transparent hover:border-red-500 transition-all duration-300 ease-in-out flex focus:shadow-outline focus:outline-none items-center"
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
        <h1 className="mt-5 text-2xl tracking-normal">Favorite Cats</h1>

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
            className="font-semibold bg-indigo-500 text-gray-100 py-4 px-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex focus:shadow-outline focus:outline-none"
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
        {isDelete && (
          <div className="absolute w-screen h-screen bg-black bg-opacity-50 z-10 flex justify-center items-center">
            <div
              className="min-w-10 bg-gray-800 px-10 py-5 rounded-xl flex flex-col gap-2 shadow-lg"
              onClick={() => {}}
            >
              <h5 className="text-sm font-bold">Are you sure?</h5>
              <h5 className="text-xs text-gray-200">
                Insert your password to verify
              </h5>
              <input
                className="w-full px-4 text-black py-2 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                placeholder="Empty if no password"
                value={password}
                onClick={() => {}}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <div className="w-full text-center mt-2">
                  <code className="text-red-500 text-center ">{error}</code>
                </div>
              )}

              <div className="flex-row flex justify-between gap-2">
                <button
                  onClick={() => {
                    deleteProfile(password);
                  }}
                  className="mt-2 font-semibold py-1 px-5 rounded-lg hover:cursor-pointer border border-red-500 hover:bg-red-500 transition-all duration-300 ease-in-out flex focus:shadow-outline focus:outline-none items-center"
                >
                  Delete User
                </button>
                <button
                  onClick={() => {
                    deleteUser(false);
                  }}
                  className="mt-2 font-semibold py-1 px-5 rounded-lg hover:cursor-pointer border border-red-500 bg-red-500 hover:opacity-90 transition-all duration-300 ease-in-out flex focus:shadow-outline focus:outline-none items-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
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
