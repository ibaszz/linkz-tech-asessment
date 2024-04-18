import { useEffect, useState } from "react";
import { BASE_API_URL } from "../env-config";
import { BaseResponse } from "./types/BaseResponse";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/router";

interface APIRequestProps<T> {
  body?: T;
  query?: T;
}

interface APIRequestCallbackProps<T> {
  call: (props?: APIRequestProps<T> | undefined | null) => void;
  isLoading: boolean;
}

interface APIRequestParam {
  path: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
}

export interface APIResponseCallbackProps<T> {
  onSuccess: (data: T) => void;
  onError?: (err: string) => void;
}

export function useCallApi<T, Y>({
  onSuccess,
  onError,
  path,
  method,
}: APIResponseCallbackProps<Y> & APIRequestParam): APIRequestCallbackProps<T> {
  const [isLoading, setLoading] = useState(false);
  const { user, logout } = useUserContext();
  const router = useRouter();

  const call = (props: APIRequestProps<T> | undefined | null) => {
    setLoading(true);
    let url = `${BASE_API_URL}/${path}`;

    if (props && props.query)
      url = `${url}?${objectToQueryParams(props.query)}`;

    fetch(url, {
      body: props && props.body && JSON.stringify(props.body),
      method,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((r) => {
        console.log(r.status);
        if (r.status === 401) {
          logout();
          router.replace("/login");
        }
        return r.json() as Promise<BaseResponse<Y>>;
      })
      .then((res) => {
        if (!res.status) {
          return onError && onError(res.desc);
        }
        onSuccess(res.data);
      })
      .catch((err) => {
        return onError && onError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    isLoading,
    call,
  };
}

function objectToQueryParams(obj: { [key: string]: any }): string {
  const queryParams = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
  return queryParams;
}
