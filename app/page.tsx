import { Suspense } from "react";
import HelloWorld from "../ui/hello-world";
import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon, HomeIcon } from '@heroicons/react/20/solid';
import { Button } from "../ui/button";

export default async function Page() {
  
  async function getContent() {
    await new Promise(reslove => setTimeout(reslove, 1000))
    return "Hello world!!!";
  }
  const content = await getContent();
  return (
    <>
      <h1>Welcome to</h1>
      <Suspense fallback={"Loading....."}>
        <HelloWorld/>
      </Suspense>
      <div className="grid grid-cols-2">
        <Link href="/home">
          <Button className="mt-4 mx-auto">
            Home &nbsp;<HomeIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
        </Link>
        <Link href="/learn">
          <Button className="mt-4 mx-auto">
            Learn English &nbsp;<BookOpenIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
        </Link>
      </div>
    </>
  );
}
