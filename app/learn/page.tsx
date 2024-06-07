import { getListWord } from "../../lib/actions";
import HeaderComponent from "../../ui/header-component";
import BodyComponent from "../../ui/learn/body-component";

export default async function Page() {
  const listWord = await getListWord();
  return (
    <div>
      <HeaderComponent content='Learn English' />
      <BodyComponent listWord={listWord}/>
    </div>
  );
}