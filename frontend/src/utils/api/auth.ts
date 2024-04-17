import { GoogleProfile } from "next-auth/providers/google";
import { APIResponseCallbackProps, useCallApi } from ".";
import { Session } from "next-auth";
import { v4 } from "uuid";
import { useUserContext } from "@/context/UserContext";

export const useLogin = ({
  onError,
  onSuccess,
}: APIResponseCallbackProps<UserResponse>) => {
  const { call, isLoading } = useCallApi<
    { email: string; transactionId: string; channel: string },
    UserResponse
  >({
    method: "POST",
    path: "/v1/auth/google/login",
    onError,
    onSuccess,
  });

  return {
    call: (email: string) =>
      call({
        body: { email, transactionId: `TRX${v4()}`, channel: "google" },
      }),
    isLoading,
  };
};

export const useRegister = ({
  onError,
  onSuccess,
}: APIResponseCallbackProps<UserResponse>) => {
  const { call, isLoading } = useCallApi<
    { email: string; password: string; name: string },
    UserResponse
  >({
    method: "POST",
    path: "/v1/auth/register",
    onError,
    onSuccess,
  });

  return { call, isLoading };
};

export const useProfile = ({
  onError,
  onSuccess,
}: APIResponseCallbackProps<ProfileResponse>) => {
  const { call, isLoading } = useCallApi<{}, ProfileResponse>({
    method: "GET",
    path: "/v1/profile",
    onError,
    onSuccess,
  });

  return { call, isLoading };
};

export const useLikeOrUnlike = ({
  onError,
  onSuccess,
}: APIResponseCallbackProps<string>) => {
  const { call, isLoading } = useCallApi<{ catId: string }, string>({
    method: "POST",
    path: "/v1/favorite",
    onError,
    onSuccess,
  });

  const { call: callUnlike, isLoading: isLoading2 } = useCallApi<
    { catId: string },
    string
  >({
    method: "PUT",
    path: "/v1/favorite",
    onError,
    onSuccess,
  });

  return {
    call: (catId: string, isLike: boolean) =>
      isLike ? call({ query: { catId } }) : callUnlike({ query: { catId } }),
    isLoading: isLoading || isLoading2,
  };
};

export const useCats = ({
  onError,
  onSuccess,
}: APIResponseCallbackProps<Cat[]>) => {
  const { call, isLoading } = useCallApi<
    { transactionId: string; channel: string },
    Cat[]
  >({
    method: "GET",
    path: "/v1/cats",
    onError,
    onSuccess,
  });

  return {
    call: () => call({ query: { transactionId: `${v4()}`, channel: "UI" } }),
    isLoading: isLoading,
  };
};
