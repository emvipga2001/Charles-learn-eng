import { getListWordRandom } from "$root/lib/usecases/word.usecase";
import HeaderComponent from "@/components/ui/header-component";
import BodyComponent from "./body-component";
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = cookies();
  const type = cookieStore.get("wordType")?.value || "1";
  const typeId = parseInt(type);
  const listWord = await getListWordRandom(typeId);
  return (
    <>
      <BodyComponent listWord={listWord}>
        <HeaderComponent content='Learn English' />
      </BodyComponent>
    </>
  );
}