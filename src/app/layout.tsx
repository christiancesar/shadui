import "@/app/global.css";
import ForecastImage from "@/assets/ForecastLogo.svg";
import { ThemeProvider } from "@/components/theme-provide";
import { ModeToggle } from "@/components/toggle-theme";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from 'next/image';
const inter = Inter({ subsets: ["latin"] });

import { Menu } from "@/components/navegationManu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export const metadata: Metadata = {
  title: "Forecast",
  description: "Hunting yours",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <nav className="p-5">
            <div className="flex justify-between">
              <div>
                <Image
                  src={ForecastImage}
                  alt="Forecast"
                />
              </div>
              <div>
                <Menu />
              </div>
                <div>
                  <ModeToggle />
                </div>
            </div>
          </nav>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
