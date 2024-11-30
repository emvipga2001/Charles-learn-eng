import Loading from "@/loading";
import { Suspense } from "react";

export default async function RootLayout({
    children,
    header
}: Readonly<{
    children: React.ReactNode;
    header: React.ReactNode;
}>) {
    return (
        <>
            {header}
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </>
    )
}