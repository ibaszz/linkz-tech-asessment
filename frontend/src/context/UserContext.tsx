import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { SignInOptions, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ProviderType } from "next-auth/providers/index";
import { useLocalStorage } from "usehooks-ts";
import { useLogin } from "@/utils/api/auth";
import { Session } from "next-auth";

type User = {
  uuid: string;
  email: string;
  image: string;
  name: string;
  accessToken: string;
};

type UserContextState = {
  user?: User;
  isLoading: boolean;
  session?: Session | null;
};

type UserContextAction = {
  login: (provider: ProviderType | "google", options?: SignInOptions) => void;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextState & UserContextAction>({
  user: undefined,
  isLoading: false,
  login: () => {},
  logout: () => new Promise(() => {}),
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  // #region VARIABLES
  const { data: userSession, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUserData, removeUser] = useLocalStorage<User>("user-data", {
    email: "",
    uuid: "",
    accessToken: "",
    image: "",
    name: "",
  });
  const router = useRouter();

  const { call: callLogin, isLoading: isLoadingLogin } = useLogin({
    onSuccess: (data) => {
      if (!data) {
        throw new Error("Unauthorized");
      }

      setUserData({
        email: data.email,
        uuid: data.uuid,
        image: data.image,
        name: data.name,
        accessToken: data.accessToken,
      });
    },
    onError: (err) => {
      console.log(err);
      // logout();
    },
  });

  const logout = () => {
    setIsLoading(true);
    router.replace("/login");
    return signOut().then(() => {
      removeUser();
    });
  };

  const login = (
    provider: ProviderType | "google",
    options?: SignInOptions
  ) => {
    setIsLoading(true);
    signIn(provider, { ...options }).finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      callLogin(userSession.user.email);
    }
  }, [status]);

  return (
    <UserContext.Provider
      value={{
        session: userSession,
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/**
 * Returns:
 * @property {User?} User - User data
 * @property {boolean} isLoading - indicator for loading
 * @property {string?} jwtToken - user's jwt token
 * @property {function} setToken - function to set jwt token
 * @property {function} setUser - function to set user
 * @property {function} disconnect - function to disconnect address and reset user's data
 */
export function useUserContext() {
  const context = useContext(UserContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
}
