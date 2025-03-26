"use client";

import React from "react";
import Link from "next/link";
import Logo from "../../public/Logo.png";
import Image from "next/image";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { SignOut } from "../../lib/data";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Header() {
    const pathname = usePathname();
    return (
        <div className={clsx("flex justify-around px-4 py-5")}>
            <div className="content-center">
                <Image src={Logo} alt={"Logo"} width={90} priority={true} />
            </div>
            <div className="grid grid-flow-col auto-cols-auto bg-gray-300 bg-opacity-20 rounded-2xl px-10 w-fit gap-5">
                <div
                    className={clsx(
                        "content-center text-white",
                        pathname === "/list-word" ? "font-bold" : ""
                    )}
                >
                    <Link href="/list-word" className="whitespace-nowrap">
                        List word
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

function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="border p-4 rounded-lg w-full justify-start"
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="not-sr-only ml-2">Dark mode</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function SheetMenuSettingHeader() {
    const router = useRouter();
    
    return (
        <Sheet>
            <SheetTrigger>
                <Bars3Icon className="w-5 text-white" />
            </SheetTrigger>
            <SheetContent side={"right"}>
                <SheetHeader>
                    <SheetTitle>Setting</SheetTitle>
                </SheetHeader>
                <div className="grid gap-3 mt-3">
                    <ModeToggle />
                    <form
                        action={async () => {
                            await SignOut();
                            router.push("/login");
                        }}
                    >
                        <Button variant={"ghost"} className="whitespace-nowrap border p-2 rounded-lg w-full justify-start">
                            <ArrowLeftEndOnRectangleIcon className="w-5 mt-[2px]" />
                            <span className="not-sr-only ml-2">Sign out</span>
                        </Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
