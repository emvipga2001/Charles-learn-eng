import { Suspense } from 'react';
import { getListWord, getListWordLimit } from '../../lib/data';
import Loading from '@/loading';
// import Words from './words';

export default async function Page() {
  const [listWord, totalCount] = await getListWordLimit();
  return (
    <Suspense fallback={<Loading/>}>
      {/* <Words params={listWord} maxLength ={totalCount}/> */}
    </Suspense>
  );
}
