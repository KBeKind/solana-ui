import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Wallet } from "@/app/Wallet";
import HeaderComp from "@/components/Header";

// importing a font (Poppins)
import { Poppins } from "next/font/google";
// instantiate the font
const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

//Layout file will affect all pages unless another layout takes over

// metadata involves stuff related to titles an SEO
export const metadata: Metadata = {
  title: "KBeKind",
  description: "Sample of Next 13 React build",
  keywords: "web development, web design, cool stuff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="bg-indigo-500">
          <HeaderComp />
        </div>

        <Wallet>{children}</Wallet>
      </body>
    </html>
  );
}
