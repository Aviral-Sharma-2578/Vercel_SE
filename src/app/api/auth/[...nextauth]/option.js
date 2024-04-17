import { NextAuthOptions, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import User1 from "@/app/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authConfig = {
    providers: [
        CredentialsProvider({
          name: "Sign in",
          credentials: {
            email: {
              label: "Email",
              type: "email",
              placeholder: "example@example.com",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            if (!credentials || !credentials.email || !credentials.password)
              return null;
            const dbUser = await User1.findOne({ emailid: credentials.email });
           // console.log(dbUser)
            if (!dbUser || !(await bcrypt.compare(credentials.password, dbUser.password))) {
              return null;
            }
            return {
              id: dbUser.isAdmin, 
              email: dbUser.emailid,
            };
          },
        }),
      ],
      session: {
        jwt: true,
        maxAge: 24*60*60,
      },
};


