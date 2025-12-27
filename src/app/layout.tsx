import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/redux/StoreProvider";
import QueryProvider from "@/components/providers/QueryProvider"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Axiom Clone",
  description: "Token Discovery Table",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <QueryProvider> 
            {children}
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}