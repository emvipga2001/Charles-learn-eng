import { Suspense } from "react";
import { ModeToggle } from "../ui/button-dark-mode";
import Header from "./components/header";

export default async function Page() {
  return (
    <div className="mx-auto text-center p-5 min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors">
      {/* <Suspense fallback={"Loading....."}>
        <Header />
      </Suspense> */}
    </div>
  );
}
