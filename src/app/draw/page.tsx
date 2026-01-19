import { Suspense } from 'react';
import DrawClientComponent from './client';

export default function Page({ searchParams }: { searchParams: Promise<{ documentId: string }> }) {
  return (
    <Suspense>
      <DrawClientComponent searchParams={searchParams} />
    </Suspense>
  );
}
