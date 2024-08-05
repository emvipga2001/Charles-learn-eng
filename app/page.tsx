import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import cardGameIcon from "../public/card-game.svg"
import listWordsIcon from "../public/list-words.svg"

export default async function Page() {
  return (
    <>
      <h1>Welcome to</h1>
      <h1>Charles Learn English!!!</h1>
      <div className="grid grid-cols-2 justify-items-center">
        <Link href="/list-words">
          <Button className="mt-4 mx-auto">
            List Words &nbsp;<Image
              priority
              src={listWordsIcon}
              alt="List Words"
              width={25}
            />
          </Button>
        </Link>
        <Link href="/learn">
          <Button className="mt-4 mx-auto">
            Flash Card English &nbsp;<Image
              priority
              src={cardGameIcon}
              alt="Flash-Card game"
              width={25}
              color="white"
            />
          </Button>
        </Link>
      </div>
    </>
  );
}
