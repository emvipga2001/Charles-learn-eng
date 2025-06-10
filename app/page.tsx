import Link from "next/link";
import { Button } from "./components/ui/button";
import { auth } from "../auth";

// D√πng l√?m trang pagelanding
export default async function Page() {
  const session = await auth();
  return (
    <div className="mx-auto text-center p-5 text-black text-white transition-colors">
      <h1 className="text-4xl font-bold mb-4">Welcome to Charles Learn English</h1>
      <p className="text-lg mb-6">
        Improve your English skills with personalized lessons and resources.
      </p>
      <Link href={session?.user ? "/home" : "/login"} className="whitespace-nowrap">
        <Button>
          {session?.user ? "Go to Home" : "Get Started"}
        </Button>
      </Link>
      <div className="mt-8">
        <p className="text-sm text-gray-600 text-gray-400">
          {session?.user
            ? `Logged in as ${session.user.name}`
            : "Sign up or log in to access all features."}
        </p>
      </div>
    </div>
  );
}
