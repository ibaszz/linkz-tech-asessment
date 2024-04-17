import { SocialButton } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { useUserContext } from "@/context/UserContext";
import { useRouterReady } from "@/hooks/useRouterReady";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export interface LoginForm {
  email?: string;
  password?: string;
}

export default function Login() {
  const { data: session, status } = useSession();
  const { login } = useUserContext();
  const [loginForm, setLoginForm] = useState<LoginForm>({});
  const { router } = useRouterReady();

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace("/");
    }
  }, [router, status, session]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <Logo animate={false} />
          <div className="mt-8 flex flex-col items-center">
            <div className="w-full flex-1 mt-7">
              <div className="flex flex-col items-center">
                <SocialButton
                  onClick={() => login("google", { callbackUrl: "/" })}
                  text="Sign in with Google"
                  src="/social/google.svg"
                />
              </div>

              <div className="my-8 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign in with e-mail
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
                {router.query.error && (
                  <div className="w-full text-center mt-2">
                    <code className="text-red-500 text-center ">
                      {router.query.error}
                    </code>
                  </div>
                )}
                <button
                  onClick={() =>
                    login("credentials", {
                      email: loginForm.email,
                      password: loginForm.password,
                    })
                  }
                  className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
