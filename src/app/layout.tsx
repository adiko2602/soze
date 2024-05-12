import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/lib/providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SOZE",
  description: "System Obsługi Zagrożeń Epidemiologicznych",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl-PL">
      <body className={inter.className}>
        <div className="min-h-screen w-full">
          <Providers>
            <Header />
            <div className="p-10">{children}</div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
