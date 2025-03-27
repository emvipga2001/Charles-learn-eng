import { useTheme } from "next-themes";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { SignOut } from "$root/lib/usecases/auth.usecase";

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

export function SheetMenuSettingHeader() {
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