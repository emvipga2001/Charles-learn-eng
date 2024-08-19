import { Suspense } from 'react';
import { getListWord, getListWordLimit } from '../../lib/data';
import Loading from '@/loading';
import Render from './render';
// import Words from './words';

export default async function Page() {
  const [listWord, totalCount] = await getListWordLimit();
  
  return (
    <Suspense fallback={<Loading/>}>
      <Render listWord={listWord}/>
    </Suspense>
  );
}
