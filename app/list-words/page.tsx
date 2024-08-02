import { Suspense } from 'react';
import { getListWord } from '../../lib/data';
import Loading from '@/loading';
import Words from './words';

export default async function Page() {
  const listWord = await getListWord();
  return (
    <Suspense fallback={<Loading/>}>
      <Words params={listWord}/>
    </Suspense>
  );
}
