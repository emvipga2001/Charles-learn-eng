import { BookOpenIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWordStore } from "$root/stores/useListWord";


export function ModeToggleLanguages() {
    const { type, setType } = useWordStore();

    const trigger = (
        <Button
            variant="ghost"
            className="border p-4 rounded-lg w-full justify-start"
        >
            <BookOpenIcon className="w-5 h-5" />
            <span className="not-sr-only ml-2">Word Type: {type === 1 ? "English" : "Japanese"}</span>
        </Button>
    );

    const content = (
        <>
            <DropdownMenuItem onClick={() => setType(1)}>
                English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setType(2)}>
                Japanese
            </DropdownMenuItem>
        </>
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {content}
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 