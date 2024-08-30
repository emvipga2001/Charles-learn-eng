import { Suspense } from "react";
import Header from "./components/header";

export default async function Page() {
  return (
    <div className="mx-auto text-center p-5 text-black transition-colors">
      {/* <Suspense fallback={"Loading....."}>
        <Header />
      </Suspense> */}
    </div>
  );
}
