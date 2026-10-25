import { Bebas_Neue, Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata = {
  title: "Mahadi Hasan — MERN Stack Developer | Creative Portfolio",
  description:
    "Editorial and cinematic portfolio of Mahadi Hasan. Specializing in high-performance full-stack web applications, React, Next.js, TypeScript, Node.js, Express, MongoDB, and AI-Driven Web Engineering.",
  keywords: [
    "Mahadi Hasan",
    "MERN Stack Developer",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Bangladesh Developer",
    "Creative Portfolio"
  ],
  authors: [{ name: "Mahadi Hasan", url: "https://github.com/mdmahadih673" }],
  creator: "Mahadi Hasan",
  openGraph: {
    title: "Mahadi Hasan — MERN Stack Developer",
    description: "Creative + Minimal + Clean + Editorial Portfolio",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${syne.variable} ${spaceGrotesk.variable} bg-black`}
    >
      <body className="bg-black text-[#FFFBD4] antialiased selection:bg-[#A90E02] selection:text-[#FFFBD4] min-h-screen flex flex-col font-editorial">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow w-full relative">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
