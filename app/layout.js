import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get me a Chai - Fund your projects with Chai",
  description: "This website is a crowdfunding platform for creators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-md:w-[100vw]">
        <SessionWrapper>
          <Navbar />
          <div className="min-h-[82.6vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white max-md:w-[100vw]'">

            {children} 
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
