import type { Metadata } from "next";
import "../public/globals.css";
import Header from "@/components/Header/Header";
import Providers from "@/components/Providers/Providers";
import { Montserrat } from "next/font/google";
import React from "react";

export const metadata: Metadata = {
  title: "Jawelianna",
  description: "Jawelianna powered by Accadia",
};

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased  min-h-screen`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
