import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      uuid: string;
      name: string;
      email: string;
      image: string;
      latestLogin: string;
      deletedAt: string;
      accessToken: string;
    };
  }
}
