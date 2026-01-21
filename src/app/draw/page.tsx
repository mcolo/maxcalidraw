import { Suspense, use } from 'react';
import DrawClientComponent from './client';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ documentId: string }>;
}) {
  const documentId = (await searchParams).documentId;
  if (!documentId) {
    return redirect('/');
  }

  return <DrawClientComponent documentId={documentId} />;
}
