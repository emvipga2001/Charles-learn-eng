import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";

export default function HeaderComponent({ content }: {  content: string  }) {
  const contentHeader = content;
  return (
    <div className="flex mt-4 mb-4 items-center gap-4">
      <Link href="/">
        <Button className="mx-auto bg-white">
          <ArrowLeftIcon className="ml-auto h-5 w-5" />&nbsp; Back 
        </Button>
      </Link>
      <h2 className="text-center text-white">{contentHeader}</h2>
    </div>
  );
}