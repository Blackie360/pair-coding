import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={` $ {inter.className} bg-dark-2`}>
       
          {children}
    <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
