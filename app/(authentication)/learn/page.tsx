import { getListWordRandom } from "$root/lib/usecases/word.usecase";
import HeaderComponent from "@/components/ui/header-component";
import BodyComponent from "./body-component";


export default async function Page() {
  const listWord = await getListWordRandom();
  return (
    <>
      <BodyComponent listWord={listWord}>
        <HeaderComponent content='Learn English' />
      </BodyComponent>
    </>
  );
}