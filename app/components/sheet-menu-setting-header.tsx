import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { SignOut } from "$root/lib/usecases/auth.usecase";
import { ModeToggleDarkMode } from "./mode-toggle-dark-mode";
import { ModeToggleLanguages } from "./toggle-word-type";

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
                    <ModeToggleDarkMode />
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
                    <ModeToggleLanguages />
                </div>
            </SheetContent>
        </Sheet>
    );
}