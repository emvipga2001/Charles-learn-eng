import Header from "@/components/header";
import Loading from "@/loading";
import { Suspense } from "react";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </>
    )
}