import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <h2>Home Page</h2>
      <Link href="/">
        <Button className="mt-4 mx-auto">
          <ArrowLeftIcon className="ml-auto h-5 w-5 text-gray-50" />&nbsp; Back 
        </Button>
      </Link>
    </>
  );
}