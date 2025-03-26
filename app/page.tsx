import Link from "next/link";
import { Button } from "./components/ui/button";
import { auth } from "../auth";

// Dùng làm trang pagelanding
export default async function Page() {
  const session = await auth()
  return (
    <div className="mx-auto text-center p-5 text-black transition-colors">
      <Link href={session?.user ? "/home" : "/login"} className="whitespace-nowrap">
        <Button>
          {session?.user ? "Home" : "Login"}
        </Button>
      </Link>
    </div>
  );
}
