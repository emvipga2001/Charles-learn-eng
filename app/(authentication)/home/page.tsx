import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="container mx-auto p-6 text-center text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
      <p className="text-lg text-white dark:text-gray-400 mb-6">
        Explore your personalized dashboard and continue improving your English skills.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/list-word">
          <Button >
            List Word
          </Button>
        </Link>
        <Link href="/learn">
          <Button >
            Start Learning
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <Link href="/">
          <Button className="flex items-center gap-2">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Landing Page
          </Button>
        </Link>
      </div>
    </div>
  );
}