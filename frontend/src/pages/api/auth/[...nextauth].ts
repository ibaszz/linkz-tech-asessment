import {
  BASE_API_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "@/utils/env-config";
import NextAuth, { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { BaseResponse } from "@/utils/api/types/BaseResponse";
import { v4 } from "uuid";
export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  debug: true,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Add logic here to look up the user from the credentials supplied
          const res = await fetch(`${BASE_API_URL}/v1/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              transactionId: `TRX${v4()}`,
              channel: "credentials",
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const userRes: BaseResponse<UserResponse> = await res.json();

          if (userRes.status) {
            return {
              id: userRes.data.uuid,
              email: userRes.data.email,
              name: userRes.data.name,
              image: userRes.data.image,
            } as User;
          } else {
            throw Error(userRes.desc);
          }
        } catch (e) {
          throw e;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  callbacks: {
    async jwt({ token, user, isNewUser }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    error: "/login",
    newUser: "/new-user",
  },
};
export default NextAuth(authOptions);
