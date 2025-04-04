"use client";

import React from "react";
import Link from "next/link";
import Logo from "$root/public/Logo.svg";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { SheetMenuSettingHeader } from "./sheet-menu-setting-header";

export default function Header() {
    const pathname = usePathname();
    return (
        <div className={clsx("flex flex-col md:flex-row justify-around px-4 py-5")}>
            <div className="grid grid-flow-col auto-cols-auto bg-gray-300 bg-opacity-20 rounded-2xl px-10 w-fit gap-5">
                <div
                    className={clsx(
                        "content-center text-white",
                        pathname === "/list-word" ? "font-bold" : ""
                    )}
                >
                    <Link href="/list-word" className="whitespace-nowrap">
                        List Word
                    </Link>
                </div>
                <div
                    className={clsx(
                        "content-center text-white",
                        pathname === "/learn" ? "font-bold" : ""
                    )}
                >
                    <Link href="/learn" className="whitespace-nowrap">
                        Learn English
                    </Link>
                </div>
                <SheetMenuSettingHeader />
            </div>
        </div>
    );
}
