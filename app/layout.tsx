import type { Metadata } from "next";
import "./globals.css";
import { auth } from "$root/auth";
import { ThemeProvider } from "./components/theme-provider";
import Background from "./components/background";

export const metadata: Metadata = {
  title: "Learn with Charles",
  description: "Learn english with Charles",
};

export default async function RootLayout({
  children,
  header
}: Readonly<{
  children: React.ReactNode;
  header: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto text-center min-h-svh transition-colors">
            <div className="h-fit">
              <Background />
              <div className="px-4">
                {session?.user && header}
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
