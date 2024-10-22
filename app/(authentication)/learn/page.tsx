import { getListWord } from "../../../lib/data";
import HeaderComponent from "../../../ui/header-component";
import BodyComponent from "./body-component";


export default async function Page() {
  const listWord = await getListWord();
  return (
    <>
      <BodyComponent listWord={listWord}>
        <HeaderComponent content='Learn English' />
      </BodyComponent>
    </>
  );
}