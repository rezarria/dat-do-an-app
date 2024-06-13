import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AXIOSInit from "../components/providers/AXIOSInit";
import { Suspense, type ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <AXIOSInit>
            <Suspense>
              {children}
            </Suspense>
          </AXIOSInit>
        </AntdRegistry>
      </body>
    </html>
  );
}
