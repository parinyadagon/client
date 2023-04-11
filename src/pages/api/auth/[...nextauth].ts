import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        user: { label: "Username", type: "text", placeholder: "jsmith" },
        pwd: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3001/api/v1/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();
        if (!data) {
          return null;
        } else {
          return data;
        }
      },
    }),
  ],
  secret: "sdfsd",
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.username;
        token.roles = user.roles;
      }

      return token;
    },
    async session({ session, token, user }) {
      if (token && session.user) {
        session.user.accessToken = token.accessToken;
        session.user.username = token.username;
        session.user.roles = token.roles;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
