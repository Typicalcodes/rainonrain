
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/Store/storeprovider";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RainOrain",
  description: "Created By Shashank Singh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen relative">
            {/* Your page content */}
            <main >
              {children}
            </main>
            
            {/* Navbar positioned at the bottom */}
         <Navbar/>
         
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}