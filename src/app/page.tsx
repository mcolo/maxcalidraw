'use client';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import DocumentsList from '@/components/documents-list';

export default function App() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <h1>Please sign in to continue</h1>;
  }

  return (
    <section>
      <Link href='/draw'>Start a new file</Link>
      <DocumentsList />
    </section>
  );
}
