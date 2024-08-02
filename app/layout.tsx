import type { Metadata } from "next";
import "./globals.css";
import ButtonDarkMode from "../ui/button-dark-mode";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
export const metadata: Metadata = {
  title: "Charles Learn English",
  description: "Learn English with Charles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto text-center p-5 min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors">
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          <ButtonDarkMode />
        </div>
      </body>
    </html>
  );
}
