import { SocialButton } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { useUserContext } from "@/context/UserContext";
import { useRouterReady } from "@/hooks/useRouterReady";
import { useState } from "react";
import { LoginForm } from "./login";
import { useRegister } from "@/utils/api/auth";

export interface RegisterForm extends LoginForm {
  name?: string;
  image?: string;
}

const Register = () => {
  const { user, session, login } = useUserContext();
  const { isReady, router } = useRouterReady();

  const [loginForm, setLoginForm] = useState<RegisterForm>({});
  const [error, setError] = useState<string>();

  const { call, isLoading } = useRegister({
    onSuccess: () => {
      router.replace("/login");
    },
    onError: (err) => {
      setError(err);
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <Logo animate={false} />
          <div className="mt-2 flex flex-col items-center">
            <div className="w-full flex-1 mt-5">
              <div className="flex flex-col mx-auto max-w-xs gap-2">
                <div
                  onClick={() => {
                    router.replace("/login");
                  }}
                  className="group rounded-lg border border-transparent hover:cursor-pointer"
                  rel="noopener noreferrer"
                >
                  <h2
                    className={`text-sm font-semibold text-left sm:min-h-10 content-center`}
                  >
                    <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
                      &lt;-
                    </span>{" "}
                    Back To Login Page
                  </h2>
                </div>
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
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Name"
                  value={loginForm.name}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, name: e.target.value })
                  }
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Image Url"
                  value={loginForm.image}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, image: e.target.value })
                  }
                />
                {error && (
                  <div className="w-full text-center mt-2">
                    <code className="text-red-500 text-center ">{error}</code>
                  </div>
                )}
                <button
                  onClick={() => {
                    setError("");
                    call(loginForm);
                  }}
                  disabled={isLoading}
                  className={`${
                    isLoading && "animate-pulse"
                  } tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
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
                  <span className="ml-3">Sign Up</span>
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
};

export default Register;
