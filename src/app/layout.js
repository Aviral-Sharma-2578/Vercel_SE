"use client";
import { Inter } from "next/font/google";
import Nav from "./(components)/Nav";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ display: "flex" }}>
          <Nav />
          <div style={{ flex: 1 }}>
            <SessionProvider>{children}</SessionProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
