import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "../ui/button-dark-mode";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "Learn with Charles",
  description: "Learn english with Charles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className="mt-5">
            <Header />
          </div>
          <div className="mx-auto text-center p-5 min-h-[90svh] bg-white text-black dark:bg-black dark:text-white transition-colors">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
